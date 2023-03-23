const express = require("express");
const app = express();
const cors = require("cors");
// =================================================================

app.use(express.json());
app.use(cors());

// all routes
const usersRoutes = require("./routes/user.route");
// =================
// ======routes will be here================
app.use("/api/v1/users", usersRoutes);

app.get("/", (req, res, next) => {
  res.send("yayyy route is working");
});

// =================================================================
module.exports = app;
