const express = require("express");
const { ConnectMongoDb } = require("./Connection/connection");
const { user } = require("./Model/model");
const cors = require("cors");
const route= require("./Routes/User_routes.js");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 2020;

const URL = "mongodb://localhost:27017/Mern"

//Connection with mongodb
ConnectMongoDb(URL)

//Midleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors(
    {
        origin : "https://login-signup-auth-hwiw.onrender.com",
        credentials : true
    }
));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://login-signup-auth-hwiw.onrender.com');
    next();
  });

//routes
app.use("/",route)


app.listen(PORT, ()=> console.log("express server started on port :", PORT))