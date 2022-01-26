const User = require('../models/userSchema');

const changeUsername = async (req, res, next) => {
  const { user } = res.locals;
  const { newUsername } = req.body;
  user.username = newUsername;
  try {
    await user.save();
  }
  catch(err) {
    return next(err)
  }
  return res.status(200).send();
}

module.exports = { changeUsername }