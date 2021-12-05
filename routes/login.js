require("dotenv").config();

var express = require("express");

var router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const generateAccessToken = require("./jwt/generateAccessToken").default;

app.use(cors());
app.use(express.json());

let refreshTokens = [];

router.post("/login", (req, res) => {
  //Authenticate user JWT

  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REF_SECRET_KEY);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

exports.module = router;
