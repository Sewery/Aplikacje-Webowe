const db = require("../db/orders");

var express = require("express");

var ordersApi = express.Router();

// ordersApi.get("/:userid", async (req, res) => {
//   const result = await db.getAllBooks();
//   res.status(200).json({ result });
// });

// ordersApi.get("/:userid", async (req, res) => {
//   const userId = req.params.userid;
//   const result = await db.getOrdersByUserId(userId);
//   res.status(200).json({ result });
// });
// ordersApi.post("/", async (req, res) => {
//   const result = await db.createBook(req.body);
//   res.status(201).json({ result });
// });
// ordersApi.delete("/:id", async (req, res) => {
//   const bookId = req.params.id;
//   res.status(200).json({ success: true });
// });

module.exports = ordersApi;
