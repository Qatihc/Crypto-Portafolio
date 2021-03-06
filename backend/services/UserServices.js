const RequestError = require("../controllers/utils/errorTypes/RequestError");
const User = require("../models/userSchema");
const Portfolio = require("../models/portfolioSchema");
const inputErrorMessages = require("../controllers/validator/errorMessages");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = class UserServices {
  static register = async ({ username, password }) => {  
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (user) return next(new RequestError(inputErrorMessages.duplicatedUser));

    const portfolio = new Portfolio();
    await portfolio.save();
    return await User.create({
      username,
      password,
      portfolio: portfolio.id
    });
  }

  static changePassword = async ({ username, password, newPassword }) => {
    const user = await User.findOne({username_lower: username.toLowerCase()});
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      user.password = newPassword;
      await user.save();
      return;
    } else {
      throw new RequestError(inputErrorMessages.invalidPassword);
    }
  }

  static login = async ({ username, password }) => { 
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (!user) throw (new RequestError(inputErrorMessages.userNotFound));

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      const token = await this.generateToken({ user });
      return { username, token };
    } 
    return next(new RequestError(inputErrorMessages.invalidPassword));
  }

  static generateToken = ({ user }) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  }

  static decodeToken = ({ token }) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  static getUserFromToken = async ({ token }) => {
    const { id } = this.decodeToken({ token });
    const user = await User.findOne({ _id: id });
    return user;
  }
}