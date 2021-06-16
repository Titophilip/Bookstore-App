const jwt = require("jsonwebtoken")

require("dotenv").config()
const secret = process.env.SECRET
const expiry = Number(process.env.EXPIRY)

exports.createToken = (user) => {
    try {
        jwt.sign(
            {
                id: user._id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }, secret, { expiresIn: expiry })
            return token 
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.decodeToken = (token) => {
    try {
        let decodedTOKEN = jwt.verify(token, secret)
        return decodedTOKEN
    } catch (error) {
        console.log(error);
        return null;
    }
}