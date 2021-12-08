const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {registerValidator, changePasswordValidator} = require('../helper/authValidator');
const isValidInput = require('../helper/isValidInput');
const loginResponse = require('../helper/loginResponse');
const User = require('../models/userSchema');


const findJwtUser = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {id} = jwt.verify(token, process.env.JWT_SECRET);
      const username = await User.findOne({_id: id});
      print(username)
      if (username) {
        return resolve({
          id,
          username,
        });
      } else {
        return reject('invalid token');
      }
    } catch(err) {
      return reject('invalid token');
    }
  });
}

const registerUser = async (req, res, next) => {
  if (!isValidInput(req.body, registerValidator)) {
    return res.status(400).send({error: 'invalid input'});
  };

  const {username, password} = req.body;
  try {
    const user = await User.findOne({username});
    if (user) {
      return res.status(400).send({error: 'username already in use'})
    }
    await User.create({
      username,
      password
    });
    res.send();
  } catch (err) {
    return next(err);
  }
}

const changePassword = async (req, res, next) => {
  if (!isValidInput(req.body, changePasswordValidator)){
    return res.status(400).send({error: 'invalid input'});
  }

  const {username, password, newPassword} = req.body;
  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(400).send({error: 'invalid username.'});
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      user.password = newPassword;
      user.save();
      res.send();
    } else {
      res.status(401).send({error: 'invalid password'});
    }
  } catch (err) {
    next(err);
  }
}

const requireAuth = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res.status(401).send({error: 'please log in'});
  }
  try {
    const user = await findJwtUser(token);
    res.locals.user = user;
    return next();
  } catch (err) {
    return res.status(401).send({error: err});
  }
}

const optionalAuth = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return next();
  }
  try {
    const user = await findJwtUser(token);
    res.locals.user = user;
    return next();
  } catch (err) {
    return res.status(401).send({error: err});
  }
}

const login = async (req, res, next) => {
  const {token} = req.headers;
  const {username, password} = req.body;

  if (token) {
    try {
      const user = await findJwtUser(token);
      return res.send(loginResponse(user, token))
    } catch (err) {
      return next(err);
    }
  }

  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(400).send({error: 'invalid username.'});
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);
      res.send(loginResponse(user, token));
    } else {
      res.status(401).send({error: 'incorrect password.'});
    }
  } catch (err) {
    next(err);
  }
}


module.exports = {registerUser, changePassword, requireAuth, optionalAuth, login}
