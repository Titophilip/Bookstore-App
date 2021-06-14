const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

exports.authenticateUser =(req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Authentication header required."})
    }
    let splittedHeader = req.headers.authorization.split(" ");

    if (splittedHeader[0] !== "Bearer") {
        return res.status(401).json({ message: "Authorization format is Bearer <token>"})
    }
    let token = splittedHeader[1];

    jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
            return res.status(500).json({ error })
        }
        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid authorization token. Please login" })
        }
    })

    next()
}
