const express = require("express")
const app = express()
const dbConnection = require('./config/database')
require('dotenv').config()
const routes = require('./routes/user')
app.use(express.json())
app.use("/api/v1", routes)
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`started at porn no ${port}`);
})

dbConnection()