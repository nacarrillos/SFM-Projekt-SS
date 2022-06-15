//require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const router = require("./routes");
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require('cookie-parser')
const passport = require('passport')

require('./middleware/passport-middleware')

app.use(express.json(),cookieParser());
app.use(cors({origin: CLIENT_URL, credentials: true}));
app.use(passport.initialize())

const {cookie} = require('express-validator')

app.use(router)


// Value of port is stored in environment variable File .env

app.listen(PORT,() =>{
    console.log(`server is up and listening on port ${PORT}`)
});