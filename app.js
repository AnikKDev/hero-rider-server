const express = require("express");
const app = express();
const cors = require("cors");
// =================================================================

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// all routes
const usersRoutes = require("./routes/user.route");
// =================
// ======routes will be here================
app.use("/api/v1/users", usersRoutes);

app.get("/", (req, res, next) => {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.send("yayyy route is working");
});

// =================================================================
module.exports = app;
