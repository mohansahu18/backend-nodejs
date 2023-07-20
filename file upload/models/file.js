const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
require("dotenv").config()

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    url: {
        type: String
    },
    tags: {
        type: String
    }
})

// post middleware

fileSchema.post("save", async function (docs) {
    console.log("docs are : - >", docs);
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // send mail
        let info = await transporter.sendMail({
            from: "sample mail",
            to: docs.email,
            subject: "new file uploaded on cloudinary",
            html: `<h1>hello jee file uploaded : - <a href=${docs.url}>view here</a></h1>`
        })
    } catch (error) {
        console.log("error occur on sending mail")
        console.log(error);
    }
})

module.exports = mongoose.model("File", fileSchema)