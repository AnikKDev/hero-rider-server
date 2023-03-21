const jwt = require("jsonwebtoken");
const { promisify } = require("util");
module.exports = async (req, res, next) => {
  try {
    // check if token exists
    // if token doesn't exist, res
    // if valid, call next.
    /* =================================== */
    const token = req.headers?.authorization?.split(" ")?.[1];
    // console.log(token);
    if (!token) {
      return res.status(400).send({
        success: false,
        data: "You are not logged in",
      });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );
    // create a new property named, user in the request and pass the value decoded
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({
      success: false,
      data: err.message,
    });
  }
};
