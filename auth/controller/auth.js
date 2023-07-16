const bcrypt = require("bcrypt")
const user = require("../model/userModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// signup handlers
const signup = async (req, res) => {
    try {
        // get data 
        const { name, email, password, role } = req.body
        // check user is already exit
        const existingUser = await user.findOne({ email })
        if (existingUser) {
            return res.status(200).json({
                success: false,
                data: "already exit"
            })
        }
        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                data: "not able to hash the password",
            })
        }
        // create the entry for user
        const User = await user.create({
            name, email, password: hashedPassword, role
        })
        return res.status(200).json({
            success: true,
            data: User,
            message: "successfull signup"
        })
    } catch (err) {
        console.log(err);
        console.error(err)
        return res.status(500).json({
            success: false,
            data: "not able to signup",
            message: err.message
        })
    }
}

// login handlers
const login = async (req, res) => {
    try {
        // data fetched
        const { email, password } = req.body
        // validation and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                data: "fill all the detail",
            })
        }
        // check for registered user
        let User = await user.findOne({ email })
        // if not a registered user
        if (!User) {
            return res.status(400).json({
                success: false,
                data: "user is not registered",
            })
        }
        const payload = {
            email: User.email,
            id: User._id,
            role: User.role
        }
        // if user exit
        // verify the password and generate jwt token
        if (await bcrypt.compare(password, User.password)) {
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            )
            User = User.toObject()
            User.token = token;
            User.password = undefined;
            let options = {
                httpOnly: true,
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "user login in successfully",
                token,
                User
            })
        } else {
            return res.status(403).json({
                success: false,
                data: "password is not correct",
            })
        }

    } catch (err) {
        console.log(err);
        console.error(err)
        return res.status(500).json({
            success: false,
            data: "not able to login",
            message: err.message
        })
    }
}

module.exports = { signup, login }