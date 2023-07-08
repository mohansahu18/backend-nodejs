const express = require("express")
const app = express()
const dbConnection = require('./config/database')
require('dotenv').config()

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log("started");
})

dbConnection()