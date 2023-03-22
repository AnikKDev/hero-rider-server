const User = require("../models/User");
module.exports.createUserServices = async (userData) => {
  const createUser = await User.create(userData);
  return createUser;
};
exports.findUserByEmailService = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
exports.getAllUsersServices = async (queries) => {
  console.log(queries);
  const { fName, email, phone } = queries;
  const query = {};

  if (fName) {
    query.fullName = fName;
  }

  if (email) {
    query.email = email;
  }

  if (phone) {
    query.phone = phone;
  }
  const users = await User.find(query);
  return users;
};
