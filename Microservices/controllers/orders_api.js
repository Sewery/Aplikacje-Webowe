const db = require("../db/orders");
const auth = require("../auth");
var express = require("express");

var ordersApi = express.Router();

ordersApi.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await db.getOrdersByUserId(userId);
  res.status(200).json({ result });
});
ordersApi.post("/", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const result = await db.createOrder(req.body);
  res.status(201).json({ result });
});
ordersApi.delete("/:id", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const orderId = req.params.id;
  const numberOfDeleted = await db.deleteOrder(orderId);
  if (numberOfDeleted === 0) {
    return res.status(404).json({ error: "Order not found." });
  }
  res.status(200).json({ result: "Order deleted" });
});
ordersApi.patch("/:id", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const orderId = req.params.id;
  const numberOfUpdated = await db.patchOrder(orderId, req.body);
  if (numberOfUpdated === 0) {
    return res.status(404).json({ error: "Order not found." });
  }
  res.status(200).json({ result: "Order patched" });
});

module.exports = ordersApi;
