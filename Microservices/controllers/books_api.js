const db = require("../services/books");
const auth = require("../auth");
var express = require("express");
var booksApi = express.Router();

booksApi.get("/", async (req, res) => {
  const result = await db.getAllBooks();
  return res.status(200).json({ result });
});

booksApi.get("/:id", async (req, res) => {
  const bookId = req.params.id;
  const result = await db.getBookById(bookId);
  return res.status(200).json({ result });
});
booksApi.post("/", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const result = await db.createBook(req.body);
  return res.status(201).json({ result });
});
booksApi.delete("/:id", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const bookId = req.params.id;
  const numberOfDeleted = await db.deleteBook(bookId);
  if (numberOfDeleted === 0) {
    return res.status(404).json({ error: "Book not found." });
  }
  return res.status(200).json({ result: "Book deleted" });
});

module.exports = booksApi;
