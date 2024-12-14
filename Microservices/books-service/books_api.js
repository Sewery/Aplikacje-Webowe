import express from "express";
import bodyParser from "body-parser";
import ds from "./books.js";
import auth from "../auth.js";
import db from "../db.js";
const { sequelize } = db;
const booksApi = express();
const port = 3001;
booksApi.use(bodyParser.urlencoded({ extended: false }));
booksApi.use(bodyParser.json());

booksApi.get("/api/books/", async (req, res) => {
  const result = await ds.getAllBooks();
  return res.status(200).json({ result });
});

booksApi.get("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const result = await ds.getBookById(bookId);
  return res.status(200).json({ result });
});
booksApi.post("/api/books/", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const result = await ds.createBook(req.body);
  z;
  return res.status(201).json({ result });
});
booksApi.delete("/api/books/:id", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const bookId = req.params.id;
  const numberOfDeleted = await ds.deleteBook(bookId);
  if (numberOfDeleted === 0) {
    return res.status(404).json({ error: "Book not found." });
  }
  return res.status(200).json({ result: "Book deleted" });
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully, for books api.");

    booksApi.listen(port, () => {
      console.log(`books api running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
})();
