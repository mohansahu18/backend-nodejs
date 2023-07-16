const express = require("express")

const routes = express.Router()

const { signup, login } = require("../controller/auth")

routes.post("/login", login)
routes.post("/signup", signup)


module.exports = routes