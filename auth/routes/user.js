const express = require("express")

const routes = express.Router()

const { signup } = require("../controller/auth")

// routes.get("/login", login)
routes.get("/signup", signup)


module.exports = routes