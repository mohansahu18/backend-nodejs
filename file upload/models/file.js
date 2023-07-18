const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    imgurl: {
        type: String
    },
    tags: {
        type: String
    }
})

module.exports = mongoose.model("File", fileSchema)