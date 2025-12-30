const express = require("express");
const { ConnectMongoDb } = require("./Connection/connection");
const { user } = require("./Model/model");
const cors = require("cors");
const route = require("./Routes/User_routes.js");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 2020;
const URL = process.env.DATABASE

//Connection with mongodb
ConnectMongoDb(URL)

//Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());


//routes
app.use("/", route)


app.listen(PORT, () => console.log("express server started on port :", PORT))