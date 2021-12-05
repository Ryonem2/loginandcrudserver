require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

const router = express.Router();

const saltRounds = 10;

const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
});

conn.connect((err) => {
  if (!!err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

router.post("/register", (req, res) => {
  try {
    const userData = req.body.userdata; 

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (!!err) return sendStatus(503);
      bcrypt.hash(userData.password1, salt, function (error, hash) {
        // Store hash in your password DB.
        if (!!error) return res.sendStatus(403);

        conn.query(
          `INSERT INTO UserData(user_name, user_sername, user_mail, user_username, user_password) VALUES ('${userData.name}','${userData.sername}','${userData.mail}','${userData.username}','${hash}','')`
        );
        res.sendStatus(201);
      });
    });
  } catch (err) {
    console.error(err);
  }
});

exports.module = router;
