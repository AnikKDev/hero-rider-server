const User = require("../models/User");
module.exports.createUserServices = async (userData) => {
  const createUser = await User.create(userData);
  return createUser;
};
exports.findUserByEmailService = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
// bulk update user
exports.bulkUpdateUsersServices = async (data) => {
  const result = await User.updateMany({ _id: data.ids }, { isBlocked: true });
  return result;
};
exports.getAllUsersServices = async (queries) => {
  console.log(queries);
  const { fName, email, phone, page = 1, limit = 10 } = queries;
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
  const skip = (page - 1) * parseInt(limit);
  console.log(page, limit, skip);
  const users = await User.find(query).skip(skip).limit(limit);
  const total = await User.countDocuments(query);
  return { users, total };
};
