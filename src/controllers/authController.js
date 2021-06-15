require("dotenv").config()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const { createToken } = require("../services/jwtService")

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
                        let token = createToken(newUser)
                        if (!token) {
                            return res.status(500).json({ message: "Sorry, we could not authenticate you." })
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
}

exports.loginUser = (req, res) => {
    User.findOne({ userName: req.body.userName }, (error, foundUser) => {
        if (error) {
            return res.status(500).json({ error })
        }
        if (!foundUser) {
            return res.status(401).json({ message: "Incorrect username/password." })
        }
        let match = bcrypt.compareSync(req.body.password, foundUser.password)
        if (!match) {
            return res.status(401).json({ message: "Incorrect username/password." })
        }
        let token = createToken(foundUser)
        if (!token) {
            return res.status(500).json({ message: "Sorry, we could not authenticate you. Please try again." })
        }
        return res.status(200).json({ message: "User logged in.", token })
    })
}