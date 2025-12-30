const express = require("express");
const { ConnectMongoDb } = require("./Connection/connection");
const { user } = require("./Model/model");
const cors = require("cors");
const user_route = require("./Routes/User_routes.js");
const task_route = require("./Routes/Task_routes.js")
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 2020;
const URL = process.env.DATABASE

//Connection with mongodb
ConnectMongoDb(URL)

app.use(cors({
    origin : "*",
}));


//Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())



//routes
app.use("/user", user_route)
app.use("/task", task_route);


app.listen(PORT, () => console.log("express server started on port :", PORT))