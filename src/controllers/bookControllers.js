const Book = require("../models/book.js");

exports.createNewBook = (req, res) => {
    let book = req.body
    Book.create(book, (error, newBook) => {
        if (error) {
            return res.status(500).json({ message: error });
        } else {
            return res.status(200).json({ message: "New Book created.", newBook});
        }
    });
};

exports.fetchBooks = (req, res) => {
    Book.find({}, (error, books) => {
        if (error) {
            return res.status(500).json({ message: error });
        } else {
            return res.status(200).json({ message: "Books Found.", books });
        }
    });
};

exports.fetchBook = (req, res) => {
    Book.findById(req.params.id, (error, book) => {
        if (error) {
            return res.status(500).json({ message: error });
        } else if (!book) {
            return res.status(404).json({ message: "Book not found." });
        } else {
            return res.status(200).json({ book });
        }
    });
};

exports.updateBook = (req, res) => {
    let update = req.body;
    if (!update) {
        return res.status(400).json({ message: "No details inputed."})
    }
    Book.findByIdAndUpdate(req.params.id, update, (error, book) => {
        if (error) {
            return res.status(500).json({ message: error });
        } else if (!book) {
            return res.status(404).json({ message: "Book not found. "});
        } else {    
            book.save((error, updatedBook) => {
                if (error) {
                    return res.status(500).json({ message: error });
                } else {
                    return res.status(200).json({ message: "Book details updated successfully.", updatedBook});
                }
            });
        }
    });
};

exports.deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (error, book) => {
        if (error) {
            return res.status(500).json({ message: error });
        } else if (!book) {
            return res.status(404).json({ message: "Book not found." });
        } else {
            return res.status(200).json({ message: "Book deleted successfully." });
        }
    });
};