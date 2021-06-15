require("dotenv").config()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const expiry = Number(process.env.EXPIRY)

exports.registerNewUser = (req, res) => {
    User.findOne({ userName: req.body.userName }, (error, existingUser) => {
        if (error) {
            return res.status(500).json({error})
        }
        if (existingUser) {
            return res.status(400).json({ message: "username already exists." })
        }
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        }, (error, newUser) => {
            if (error) {
                return res.status(500).json({error})
            }
            bcrypt.genSalt(10, (error, salt) => {
                if (error) {
                    return res.status(500).json({error})
                }
                bcrypt.hash(req.body.password, salt, (error, hashedPassword) => {
                    if (error) {
                        return res.status(500).json({error})
                    }
                    newUser.password = hashedPassword
                    newUser.save((error, savedUser) => {
                        if (error) {
                            return res.status(500).json({error})
                        }
                        jwt.sign(
                            {
                                id: newUser._id,
                                userName: newUser.userName,
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                role: newUser.role
                            }, secret, { expiresIn: parselnt(expiry) }, (error, token) => {
                            if (error) {
                                return res.status(500).json({error})
                            }
                            return res.status(200).json({ 
                                message: "User creation successful.", 
                                token
                            })
                        })                        
                    })
                })
            })
        })
    })
}

exports.loginUser = (req, res) => {
    User.findOne({ userName: req.body.userName }, (error, foundUser) => {
        if (error) {
            return res.status(500).json({ error })
        }
        if (!foundUser) {
            return res.status(401).json({ message: "Incorrect username." })
        }
        let match = bcrypt.compareSync(req.body.password, foundUser.password)
        if (!match) {
            return res.status(401).json({ message: "Incorrect password." })
        }
        jwt.sign({
            id: foundUser._id,
            userName: foundUser.userName,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role: foundUser.role
        }, secret, {
            expiresIn: expiry
        }, (error, token) => {
            if (error) {
                return res.status(500).json({ error })
            }
            return res.status(200).json({ message: "User logged in.", token })
        })
    })
}