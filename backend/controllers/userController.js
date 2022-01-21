const User = require('../models/userSchema');
const {changeUsernameValidator} = require('./utils/inputValidators/userValidator');

const changeUsername = async (req, res, next) => {
  const err = changeUsernameValidator(req.body);
  if (err) return next(err)

  const {user} = res.locals;
  const {newUsername} = req.body;
  user.username = newUsername;
  try {
    await user.save();
  }
  catch(err) {
    return next(err)
  }
  return res.status(200).send();
}

module.exports = {changeUsername}