const RequestError = require("../controllers/utils/errorTypes/RequestError");
const User = require("../models/userSchema");
const Portfolio = require("../models/portfolioSchema");
const inputErrorMessages = require("../controllers/validator/errorMessages");
const AuthServices = require("./AuthServices");
const bcrypt = require('bcrypt');

module.exports = class UserServices {
  register = async ({ username, password }) => {  
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (user) return next(new RequestError(inputErrorMessages.duplicatedUser, 400));

    const portfolio = new Portfolio();
    await portfolio.save();
    return await User.create({
      username,
      password,
      portfolio: portfolio.id
    });
  }

  changePassword = async ({ username, password, newPassword }) => {
    const user = await User.findOne({username_lower: username.toLowerCase()});
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      user.password = newPassword;
      await user.save();
      return;
    } else {
      throw new RequestError(inputErrorMessages.invalidPassword, 401);
    }
  }

  login = async ({ username, password }) => { 
    const user = await User.findOne({username_lower: username.toLowerCase()});
    if (!user) throw (new RequestError(inputErrorMessages.userNotFound, 400));

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      const token = await AuthServices.generateToken(user);
      return res.send({"username": username, "token": token});
    } 
    return next(new RequestError(inputErrorMessages.invalidPassword, 401));
  }
}