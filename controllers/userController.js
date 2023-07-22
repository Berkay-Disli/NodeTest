const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory.")
    }

    const userAvailable = await User.findOne({ email })

    if (userAvailable) {
        res.status(400)
        throw new Error("User already exists.")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })
    console.log(`User created ${newUser}`)
    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            email: newUser.email
        })
    } else {
        res.status(400)
        throw new Error("User data is not valid and could not be created.")
    }
    res.status(200).json({
        message: "register user endpoint"
    })
})

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Email and password are mandatory.")
    }

    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1h"})
        res.status(200).json({accessToken})
    } else {
        res.status(401)
        throw new Error("Email or password is not valid.")
    } 
})

const getCurrentUser = asyncHandler( async (req, res) => {

    
    res.status(200).json({
        message: "give current user endpoint"
    })
})


module.exports = { registerUser, loginUser, getCurrentUser }