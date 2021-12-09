const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const inputErrorMessages = require('../inputValidators/inputErrorMessages')
const {registerValidator, changePasswordValidator} = require('../inputValidators/authValidator');
const RequestError = require('../errorTypes/RequestError');
const User = require('../models/userSchema');


const findJwtUser = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {id} = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({_id: id});
      if (user) {
        return resolve(user);
      }
      return reject(new RequestError(inputErrorMessages.invalidToken, 401));

    } catch(err) {
      return reject(new RequestError(err.message, 401));
    }
  });
}

const generarToken = async (user) => {
  return jwt.sign({id: user._id}, process.env.JWT_SECRET)
}

const registerUser = async (req, res, next) => {
  const err = registerValidator(req.body);
  if (err) return next(err);

  const {username, password} = req.body;
  try {
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (user) return next(new RequestError(inputErrorMessages.duplicatedUser, 400))

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
  const err = changePasswordValidator(req.body);
  if (err) return next(err);

  const {username, password, newPassword} = req.body;
  try {
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (!user) return next(new RequestError(inputErrorMessages.userNotFound, 400))
    
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      user.password = newPassword;
      await user.save();
      return res.status(200).send();
    }
    return next(new RequestError(inputErrorMessages.invalidPassword, 401));

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
      if (user) return res.send({"username": user.username, "token": token})

    } catch (err) {
      return next(err);
    }
  }

  try {
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (!user) return next(new RequestError(inputErrorMessages.userNotFound, 400));

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      const token = await generarToken(user);
      return res.send({"username": username, "token": token});
    } 
    return next(new RequestError(inputErrorMessages.invalidPassword, 401));

  } catch (err) {
    return next(err);
  }
}

const requireAuth = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) return next(new RequestError(inputErrorMessages.authRequired, 401));
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
    return next(err);
  }
}

module.exports = {registerUser, changePassword, requireAuth, optionalAuth, login}
