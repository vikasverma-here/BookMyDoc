
require('dotenv').config({ path: 'config/config.env' });
const express = require("express")
const app = express()
const cors = require("cors");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const messageRouter = require("../src/routes/message.router")
const {errorMiddleware} = require("../src/middleware/errorMiddleware")
const userRouter = require("./routes/user.router")

app.use(cors({
    origin:[process.env.FRONTEND_URI,process.env.DASHBOARD_URI],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

// this middleware handle all the route related to message 
app.use("/api/v1/message",messageRouter)

// this middleware hadle all  the route related to user
app.use("/api/v1/user",userRouter)
app.use(errorMiddleware)
module.exports = app;