const express = require("express");
const connectDB = require("./db/setup");

const bookRoutes = require("./routes/bookRoutes")
const authRoutes = require("./routes/authRoutes");

const { seedAdmin } = require("./seeders/admin")
// seedAdmin()

require("dotenv").config();

const app = express();

app.use(express.json());

connectDB();

app.use(bookRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to The BookStore App!" });
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log("App is up and running.");
});