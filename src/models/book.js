const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    author: {
        type: String,
        required: true
    },

    description: String,

    category: {
        type: String,
        required: true
    },

    purchaseCount: Number,

    imageURL: String,

    tags: Array
})

mongoose.set('useCreateIndex', true);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;