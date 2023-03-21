module.exports.createUserServices = async (userData) => {
  const createUser = await Blog.create(userData);
  console.log("hello from create user service");
  return createUser;
};
