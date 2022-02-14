const User = require("../models/userSchema");

export const UserRepository = {
  create = async ({ username, password, portfolio }) => {
    const newUser = await User.create({ username, password, portfolio });
    return newUser;
  },

  findById = async ({ id }) => {
    const user = await User.findOne({ id });
    return user;
  },

  findByUsername = async ({ username }) => {
    const user = await User.findOne({ username });
    return user;
  },

  changePassword = async({ id, newPassword }) => {
    const user = await User.findOne({ id });
    user.password = newPassword;
    await user.save();
    return;
  }
}