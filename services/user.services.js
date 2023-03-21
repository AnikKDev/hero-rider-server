const User = require("../models/User");
module.exports.createUserServices = async (userData) => {
  const createUser = await User.create(userData);
  return createUser;
};
exports.findUserByEmailService = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
