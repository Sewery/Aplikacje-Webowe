const db = require("../db/books");
var express = require("express");
var booksApi = express.Router();

booksApi.get("/", async (req, res) => {
  const result = await db.getAllBooks();
  res.status(200).json({ result });
});

booksApi.get("/:id", async (req, res) => {
  const bookId = req.params.id;
  const result = await db.getBookById(bookId);
  res.status(200).json({ result });
});
booksApi.post("/", async (req, res) => {
  const result = await db.createBook(req.body);
  res.status(201).json({ result });
});
booksApi.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  res.status(200).json({ success: true });
});

module.exports = booksApi;
