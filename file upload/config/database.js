const mongoose = require("mongoose");
require("dotenv").config()
const DB_URL = process.env.DATABASE_URL

const dbConnection = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("db connected successfully"))
        .catch((e) => {
            console.log("issue with db connection");
            console.log(e);
        })
}

module.exports = dbConnection