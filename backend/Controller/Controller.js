const { user } = require("../Model/model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


// register user
const signup = async (req, res) => {
    try {
        // Get user data from request body
        const { Name, Email, Password } = req.body;

        // Check if user already exists
        const User = await user.findOne({ Email })
        if (User) {
            return res.status(400).json({
                msg: "User already exist",
                success: false
            })
        }

        // Create new user model
        const userModel = new user({ Name, Email, Password })

        // Hash password
        userModel.Password = await bcrypt.hash(Password, 10)

        // Save user model to database
        await userModel.save()

        // Return success response
        res.status(201).json({
            msg: "Signup Successfully",
            success: true,
            user: userModel
        })
        userModel.Password = await bcrypt.hash(Password, 10);
        await userModel.save();
        res.status(201)
            .json({ msg: "Signup Successfully", success: true, user : userModel })
    } catch (error) {
        // Return error response
        res.status(500).json({
            msg: "Internal server error",
            success: false
        })
        res.status(500)
            .json({
                msg: "Internal server error", success: false
            })
    }
}
// login user
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