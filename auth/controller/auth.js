const bcrypt = require("bcrypt")
const user = require("../model/userModel")

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
            name, email, password: hashedPassword
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