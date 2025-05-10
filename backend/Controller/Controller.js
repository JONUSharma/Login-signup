const { user } = require("../Model/model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;
        const User = await user.findOne({ Email })
        if (User) {
            return res.status(400).json({ msg: "User already exist", success: false })
        }
        const userModel = new user({ Name, Email, Password })
        userModel.Password = await bcrypt.hash(Password, 10);
        await userModel.save();
        res.status(201).json({ msg: "Signup Successfully", success: true })
    } catch (error) {
        res.status(500)
            .cookie(userModel, {
                sameSite: 'none',
                httpOnly: true,
                expires: new Date(Date.now() + 2 * 24 * 60 * 1000),
                secure: process.env.NODE_ENV === "production"
            })
            .json({
                msg: error,
                msg2: "Internal server error", success: false
            })
    }
}
const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const User = await user.findOne({ Email });
        if (!User) {
            return res.status(403).json({ msg: "user not exist", success: false })
        }
        const checkPassword = await bcrypt.compare(Password, User.Password)
        if (!checkPassword) {
            return res.status(403).json({ msg: "Email or password is wrong", success: false })
        }

        const jwtToken = jwt.sign({ Email: User.Email, _id: User._id },
            process.env.JWT_SECRET,
            { expiresIn: "4h" },
        )
        res.status(200).json({
            msg: "Login Successfully", success: true,
            jwtToken, Email, Name: User.Name
        })
    }
    catch (error) {
        res.status(500)
            .json({
                msg: error,
                msg2: "Internal server error", success: false
            })
    }
}
module.exports = {
    signup,
    login
}