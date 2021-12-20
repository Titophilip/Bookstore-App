const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true
    },
    password: {
        type: String,
        // required: true
    },

    role: {
        type: String,
        enum: ["regular", "admin"],
        default: "regular"
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;