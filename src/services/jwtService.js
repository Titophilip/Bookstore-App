const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const expiry = Number(process.env.EXPIRY)

exports.createToken = async (user) => {
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