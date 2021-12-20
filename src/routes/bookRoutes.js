const express = require("express")
const bookRouter = express.Router()
const bookController = require("../controllers/bookControllers");
const { authenticateUser, checkIfAdmin } = require("../middlewares/authentication");


bookRouter.get("/", authenticateUser, bookController.fetchBooks);
bookRouter.get("/:id", authenticateUser, bookController.fetchBook);
bookRouter.post("/", authenticateUser, checkIfAdmin, bookController.createNewBook);
bookRouter.put("/update/:id", authenticateUser, checkIfAdmin, bookController.updateBook);
bookRouter.delete("/delete/:id", authenticateUser, checkIfAdmin, bookController.deleteBook);

module.exports = bookRouter;