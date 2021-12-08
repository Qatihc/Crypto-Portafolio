const authRouter = require('express').Router();
const {
  registerUser,
  changePassword,
  login
} = require('../controllers/authController');

authRouter.post('/register', registerUser);
authRouter.post('/changePassword', changePassword);
authRouter.post('/login', login);

module.exports = authRouter;