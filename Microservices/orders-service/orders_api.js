// Import required modules
import express from "express";
import bodyParser from "body-parser";
import ds from "./orders.js";
import auth from "../auth.js";
import db from "../db.js";
const { sequelize } = db;

const ordersApi = express();
const port = 3002;
ordersApi.use(bodyParser.urlencoded({ extended: false }));
ordersApi.use(bodyParser.json());

ordersApi.get("/api/orders/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await ds.getOrdersByUserId(userId);
  res.status(200).json({ result });
});
ordersApi.post("/api/orders/", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const result = await ds.createOrder(req.body);
  if (result == null) {
    return res.status(404).json({ error: "incorrect order details" });
  }
  res.status(201).json({ result });
});
ordersApi.delete("/api/orders/:id", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const orderId = req.params.id;
  const numberOfDeleted = await ds.deleteOrder(orderId);
  if (numberOfDeleted === 0) {
    return res.status(404).json({ error: "Order not found." });
  }
  res.status(200).json({ result: "Order deleted" });
});
ordersApi.patch("/api/orders/:id", async (req, res) => {
  const authRes = await auth.authenticate(req, res);
  if (authRes != null) return;
  const orderId = req.params.id;
  const numberOfUpdated = await ds.patchOrder(orderId, req.body);
  if (numberOfUpdated === 0) {
    return res.status(404).json({ error: "Order not found." });
  }
  res.status(200).json({ result: "Order patched" });
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully, for orders api.");

    ordersApi.listen(port, () => {
      console.log(`orders api running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
})();
