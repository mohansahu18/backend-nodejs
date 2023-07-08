const mongoose = require("mongoose");

require('dotenv').config()
const DB_URL = process.env.DATABASE_URL
const dbConnection = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("connected"))
        .catch((err) => {
            console.log("not connected");
            console.log(err);
        })
}
module.exports = dbConnection