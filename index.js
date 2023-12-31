// dot env configure
const dotenv = require('dotenv');
dotenv.config();

// express
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// express app init
const app = express();

// get mongoose instance
require('./config/db')

//registering cors
app.use(cors());

//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use morgan
app.use(morgan('dev'));

//Routes
const Routes = require("./route/routes"); //bring in our user routes
app.use("/api", Routes);

// Listen express app server on port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('App is running on: ' + PORT);
});