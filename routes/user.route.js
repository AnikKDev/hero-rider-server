const {
  createUser,
  login,
  getMe,
  getAllUsers,
} = require("../controllers/user.controller");

const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
// using routes
router.route("/register").post(createUser);
router.route("/signin").post(login);
router.get("/all-users", verifyToken, getAllUsers);
router.get("/me", verifyToken, getMe);
module.exports = router;
