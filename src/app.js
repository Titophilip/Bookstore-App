const express = require("express");
const connectDB = require("./db/setup");

const bookRoutes = require("./routes/bookRoutes")
const authRoutes = require("./routes/authRoutes");

const { seedAdmin } = require("./seeders/admin")
seedAdmin()

require("dotenv").config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to The BookStore App!" });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("App is up and running.");
});