const express = require("express")

const routes = express.Router()

const { signup, login } = require("../controller/auth")
const { auth, isStudent, isAdmin } = require("../middleware/auth")

routes.post("/login", login)
routes.post("/signup", signup)

//testing protected routes
routes.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "welcome to test portal"
    })
})
// protected routes
routes.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "welcome to student portal"
    })
})
routes.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "welcome to admin  portal"
    })
})
module.exports = routes