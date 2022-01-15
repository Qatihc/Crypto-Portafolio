const { changeUsername } = require('../controllers/userController');
const { requireAuth } = require('../controllers/authController')

const userRouter = require('express').Router();

userRouter.post('/changeUsername', requireAuth, changeUsername);

module.exports = userRouter;