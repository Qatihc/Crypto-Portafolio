const jwt = require('jsonwebtoken');

module.exports = class AuthServices {
  generateToken = ({ user }) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  }

  decodeToken = ({ token }) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}