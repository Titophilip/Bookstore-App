const express = require("express")
const bookRouter = express.Router()
const bookController = require("../controllers/bookControllers");
const { authenticateUser, checkIfAdmin } = require("../middlewares/authentication");


bookRouter.get("/books", bookController.fetchBooks);
bookRouter.get("/books/:id", bookController.fetchBook);
bookRouter.post("/books", authenticateUser, checkIfAdmin, bookController.createNewBook);
bookRouter.put("/books/:id", authenticateUser, checkIfAdmin, bookController.updateBook);
bookRouter.delete("/books/:id", authenticateUser, checkIfAdmin, bookController.deleteBook);

module.exports = bookRouter;