//require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");

require("./middleware/passport-middleware");

app.use(express.json(), cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

const { cookie } = require("express-validator");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

app.use(router);

// Value of port is stored in environment variable File .env

app.listen(PORT, () => {
  console.log(`server is up and listening on port ${PORT}`);
});
