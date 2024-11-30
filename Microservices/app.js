const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/books", require("./controllers/books_api"));
app.use("/api/books", require("./controllers/orders_api"));
app.use("/api/books", require("./controllers/users_api"));
// const db = require("./db/books");
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.get("/api/books", async (req, res) => {
//   const result = await db.getAllBooks();
//   res.status(200).json({ result });
// });

// app.get("/api/books/:id", async (req, res) => {
//   const bookId = req.params.id;
//   const result = await db.getBookById(bookId);
//   res.status(200).json({ result });
// });
// app.post("/api/books", async (req, res) => {
//   const result = await db.createBook(req.body);
//   res.status(201).json({ result });
// });
// app.delete("/api/books/:id", async (req, res) => {
//   const bookId = req.params.id;
//   res.status(200).json({ success: true });
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
