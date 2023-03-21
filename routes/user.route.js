const { createUser } = require("../controllers/user.controller");

const router = require("express").Router();

// using routes
router.route("/users/add").post(createUser);
module.exports = router;
