require("dotenv").config();

const PORT = 8001;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
