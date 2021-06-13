const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");


authRouter.post("/signup", authController.registerNewUser);
authRouter.post("/login", authController.loginUser);

module.exports = authRouter;