const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const inputErrorMessages = require('../inputValidators/inputErrorMessages')
const {registerValidator, changePasswordValidator} = require('../inputValidators/authValidator');

const User = require('../models/userSchema');


const findJwtUser = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {id} = jwt.verify(token, process.env.JWT_SECRET);
      const {username} = await User.findOne({_id: id});
      if (username) {
        return resolve({
          id,
          username,
        });
      }
      return reject('invalid token');
    } catch(err) {
      return reject('invalid token');
    }
  });
}

const registerUser = async (req, res, next) => {
  const {err} = registerValidator(req.body);
  if (err) return res.status(400).send({err});

  const {username, password} = req.body;
  try {
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (user) return res.status(400).send({err: inputErrorMessages.duplicatedUser})
    await User.create({
      username,
      password
    });
    res.status(200).send();
  } catch (err) {
    console.log(err)
    return next(err);
  }
}

const changePassword = async (req, res, next) => {
  const {err} = changePasswordValidator(req.body);
  if (err) return res.status(400).send({err});

  const {username, password, newPassword} = req.body;
  try {
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (!user) return res.status(400).send({err: inputErrorMessages.userNotFound});
    
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      user.password = newPassword;
      await user.save();
      return res.status(200).send();
    }

    return res.status(401).send({err: inputErrorMessages.invalidPassword});
  } catch (err) {
    return next(err);
  }
}

const login = async (req, res, next) => {
  const {token} = req.headers;
  const {username, password} = req.body;

  if (token) {
    try {
      const user = await findJwtUser(token);
      if (user.id) return res.send({"username": user.username, "token": token})
    } catch (err) {
      return next(err);
    }
  }

  try {
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (!user) return res.status(400).send({err: exports.userNotFound});

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);
      return res.send({"username": username, "token": token});
    } 
    return res.status(401).send({err: exports.invalidPassword});

  } catch (err) {
    return next(err);
  }
}

const requireAuth = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) return res.status(401).send({error: 'please log in'});
  try {
    const user = await findJwtUser(token);
    res.locals.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}

const optionalAuth = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) return next();

  try {
    const user = await findJwtUser(token);
    res.locals.user = user;
    return next();
  } catch (err) {
    return next();
  }
}

module.exports = {registerUser, changePassword, requireAuth, optionalAuth, login}
