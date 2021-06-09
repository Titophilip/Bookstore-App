const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    category: String,
    purchaseCount: Number,
    imageURL: String,
    tags: Array
})

mongoose.set('useCreateIndex', true);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;