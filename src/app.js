const express = require("express");
const connectDB = require("./db");
const bookRoutes = require("./routes/bookRoutes")
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

connectDB();

const app = express();

app.use(express.json());

app.use(bookRoutes);
app.use("/auth" ,authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to The BookStore App!" });
});

const port = process.env.PORT || 5070;

app.listen(port, () => {
    console.log("App is up and running.");
});