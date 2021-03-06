const RequestError = require('../errors/RequestError');
const { validationResult } = require('express-validator');
const inputErrorMessages = require('./validator/errorMessages');
const UserServices = require('../services/UserServices');

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new RequestError(errors.array[0]));
  }
  const { username, password } = req.body;
  try {
    await UserServices.register({ username, password });
    return res.status(200).send();
  } catch (err) {
    return next(err);
  }
}

const changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new RequestError(errors.array[0]));
  }
  const { password, newPassword } = req.body;
  const { user } = req.locals;
  try {
    await UserServices.changePassword({ username: user.username, password, newPassword });
    return res.status(200).send();
  } catch (err) {
    return next(err);
  }
}

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new RequestError(errors.array[0]));
  }

  const { username, password } = req.body;
  try {
    const loginResponse = await UserServices.login({ username, password });
    res.send(loginResponse);
  } catch (err) {
    return next(err);
  }
}

const requireAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new RequestError(inputErrorMessages.authRequired));
  try {
    const user = await UserServices.getUserFromToken({ token });
    res.locals.user = user;
    return next();

  } catch (err) {
    return next(err);
  }
}

const optionalAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next();
  try {
    const user = await UserServices.getUserFromToken({ token });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { registerUser, changePassword, requireAuth, optionalAuth, login }
