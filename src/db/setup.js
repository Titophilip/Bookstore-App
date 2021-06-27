const mongoose = require("mongoose")
require("dotenv").config()
const { MONGO_URI } = process.env;


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("Database Connected.")
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }

}

module.exports = connectDB;