const express = require("express")
const bookRouter = express.Router()
const bookController = require("../controllers/bookControllers");
const { authenticateUser } = require("../middlewares/authentication");



bookRouter.get("/books", authenticateUser, bookController.fetchBooks);
bookRouter.get("/books/:id", bookController.fetchBook);
bookRouter.post("/books", bookController.createNewBook);
bookRouter.put("/books/:id", bookController.updateBook);
bookRouter.delete("/books/:id", bookController.deleteBook);

module.exports = bookRouter;