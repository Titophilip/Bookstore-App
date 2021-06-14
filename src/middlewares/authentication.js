exports.authenticateUser =(req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Authentication header required."})
    }
    let splittedHeader = req.headers.authorization.split(" ")
    if (splittedHeader[0] !== "Bearer") {
        return res.status(401).json({ message: "Authorization format is Bearer <token>"})
    }
    
    next()
}