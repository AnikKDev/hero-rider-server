const { createUserServices } = require("../services/user.services");
// add a user
exports.createUser = async (req, res, next) => {
  try {
    // console.log(req.body);
    const newUser = await createUserServices(req.body);
    res.status(201).send({
      success: true,
      data: newUser,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
