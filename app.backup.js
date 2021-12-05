require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authenToken = require("./jwt/middleware/authenToken").default;
const generateAccessToken = require("./jwt/generateAccessToken").default;
const { adminUser } = require("./tmp/var");
const login = require("./routes/login");

app.use(cors());
app.use(express.json());

let refreshTokens = [];

app.get("/posts", authenToken, (req, res) => {
  res.json(adminUser.filter((user) => user.username === req.user.name));
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REF_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.post("/register", (req, res) => {
  res.send(admin);
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.send(204);
});

app.use("/", login);

app.listen(8080, () => {
  console.log("server running on port 8080");
});
