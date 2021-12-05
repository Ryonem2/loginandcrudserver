require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.default = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "15m" });
};
