// start an express server in 3000 port using mongoose dotenv cors and body-parser modules logger middleware and error handler
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./middlewares/logger");
const routes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const errorHandler = require("./middlewares/errorHandler");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

require("./database/connection")();

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// jwt validation with bearer token except for auth/login and auth/register
app.use((req, res, next) => {
  if (
    req.url === "/api/user/login" ||
    req.url === "/api/user/register" ||
    req.url === "/api/admin/register" ||
    req.url === "/api/admin/login"
  ) {
    next();
  } else {
    const token = req.headers["authorization"];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({
            message: "Invalid token",
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: "Token not found",
      });
    }
  }
});

// routes for user
app.use("/api/user", routes);

// routes for admin
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
