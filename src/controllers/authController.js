const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = "verySecurePASSWORD"
const expiry = 3600

exports.registerNewUser = (req, res) => {
    User.findOne({ userName: req.body.username }, (error, existingUser) => {
        if (error) {
            return res.status(500).json({error})
        }
        if (existingUser) {
            return res.status(400).json({ message: "username already exists." })
        }
        let user = req.body
        User.create(user, (error, newUser) => {
            if (error) {
                return res.status(500).json({error})
            }
            bcrypt.genSalt(10, (error, salt) => {
                if (error) {
                    return res.status(500).json({error})
                }
                bcrypt.hash(req.body.password, (error, hashedPassword) => {
                    if (error) {
                        return res.status(500).json({error})
                    }
                    newUser.password = hashedPassword
                    newUser.save((error, savedUser) => {
                        if (error) {
                            return res.status(500).json({error})
                        }
                        jwt.sign({
                            id: newUser._id,
                            userName: newUser.userName,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName
                        }, secret, { expiresIn: expiry }, (error, token) => {
                            if (error) {
                                return res.status(500).json({error})
                            }
                            return res.status(200).json({ 
                                message: "User creation successful", 
                                token
                            })
                        })                        
                    })
                })
            })
        })
    })
}