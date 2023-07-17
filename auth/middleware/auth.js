const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req, res, next) => {
    try {
        // extract jwt token
        const token = req.body.token || req.cookie.token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token missing"
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log("decode=> :", decode);
            req.User = decode
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "invalid token"
            })
        }
        next()
    } catch (err) {
        console.log(err);
        console.error(err);
        return res.status(401).json({
            success: false,
            message: "something wrong while verifying the token"
        })
    }
}

const isStudent = (req, res, next) => {
    try {
        if (req.User.role != "student") {
            return res.status(401).json({
                success: false,
                message: "this is protected routes for student"
            })
        }
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role cannot be verify"
        })
    }
}

const isAdmin = (req, res, next) => {
    try {
        if (req.User.role != "admin") {
            return res.status(401).json({
                success: false,
                message: "this is protected routes for admin"
            })
        }
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role cannot be verify"
        })
    }
}

module.exports = { auth, isStudent, isAdmin }