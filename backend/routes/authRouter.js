const authRouter = require('express').Router();
const {
  registerUser,
  changePassword,
  login,
  requireAuth
} = require('../controllers/authController');
const { authValidator } = require('../controllers/validator');

authRouter.post('/register', authValidator('register'), registerUser);
authRouter.post('/login', authValidator('login'), login);
authRouter.post('/changePassword', requireAuth, authValidator('changePassword'), changePassword);

module.exports = authRouter;