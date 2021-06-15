const express = require("express")
const bookRouter = express.Router()
const bookController = require("../controllers/bookControllers");
const { authenticateUser } = require("../middlewares/authentication");



bookRouter.get("/books", authenticateUser, bookController.fetchBooks);
bookRouter.get("/books/:id", authenticateUser, bookController.fetchBook);
bookRouter.post("/books", authenticateUser, bookController.createNewBook);
bookRouter.put("/books/:id", authenticateUser, bookController.updateBook);
bookRouter.delete("/books/:id", authenticateUser, bookController.deleteBook);

module.exports = bookRouter;