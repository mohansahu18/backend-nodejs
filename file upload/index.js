const express = require("express")
require('dotenv').config()
const dbConnection = require('./config/database')
const fileUpload = require("express-fileupload")

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use(fileUpload())

const router = require("./routes/fileupload")
app.use('/api/v1', router)

const cloudinary = require("./config/cloudinary")
cloudinary()

app.listen(PORT, () => {
    console.log(`server started on port no ${PORT}`);
})

dbConnection()