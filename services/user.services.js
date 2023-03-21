const User = require("../models/User");
module.exports.createUserServices = async (userData) => {
  const createUser = await User.create(userData);
  return createUser;
};
