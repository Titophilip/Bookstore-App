const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const { decodeToken } = require("../services/jwtService")

exports.authenticateUser =(req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Authentication header required."})
    }
    let splittedHeader = req.headers.authorization.split(" ");

    if (splittedHeader[0] !== "Bearer") {
        return res.status(401).json({ message: "Authorization format is Bearer <token>."})
    }
    let token = splittedHeader[1];

    let decodedToken = decodeToken(token)
    if (!decodedToken) {
        return res.status(401).json({ message: "Invalid authorization token. Please login." })
    } else {
        req.user = decodedToken
        next();
    }
}

exports.checkIfAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({ message: "You are not authorised to perform this action." })
    }
    next();
}
