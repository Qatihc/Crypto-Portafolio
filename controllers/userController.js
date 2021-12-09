
const User = require('../models/userSchema');

const changeUsername = (req, res, next) => {
  const {id} = res.locals.user
  return res.send(id)
}

module.exports = {changeUsername}