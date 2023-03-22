const {
  createUserServices,
  findUserByEmailService,
  getAllUsersServices,
  bulkUpdateUsersServices,
} = require("../services/user.services");
const { generateToken } = require("../utils/generateToken");
// add a user
exports.createUser = async (req, res, next) => {
  try {
    console.log(req.body.role);
    const userInfo = { email: req.body.email, role: req.body.role };
    const token = generateToken(userInfo);
    const newUser = await createUserServices(req.body);
    const { password, ...others } = newUser.toObject();
    res.status(201).send({
      success: true,
      data: { others, token },
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
// get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    console.log(req.query);
    const { users, total } = await getAllUsersServices(req.query);
    res.status(200).json({ success: true, data: users, total: total });
  } catch (err) {
    res.status(400).json(err);
  }
};
// bulk update user
exports.bulkUpdate = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await bulkUpdateUsersServices(req.body);
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(400).json(err);
  }
};
// login user

exports.login = async (req, res) => {
  try {
    /* 
      check if the email and password has been given or not
      */
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        status: "failed",
        message: "Please provide required credentials",
      });
    }
    /* 
     check if the email is in db or not
     */
    const user = await findUserByEmailService(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        status: "failed",
        message: "No user found. Please create an account first",
      });
    }
    /* 
      password validation
      */
    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        status: "failed",
        message: "Password is invalid",
      });
    }

    /* 
      generate token
      */
    const token = generateToken(user);
    // we don't want to send password to the response so we will do this,
    const { password: userPasword, ...others } = user.toObject();
    res.status(200).json({
      success: true,
      status: "success",
      message: "User found",
      data: { token, others },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      data: err.message,
    });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    console.log(req.user.role);
    const user = await findUserByEmailService(req?.user?.email);

    res.status(200).json(user);
  } catch (err) {
    res.status(400).send({
      success: false,
      data: err.message,
    });
  }
};
