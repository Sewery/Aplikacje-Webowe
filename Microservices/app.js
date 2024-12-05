const express = require("express");
const db = require("./services/db");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/books", require("./controllers/books_api"));
app.use("/api/orders", require("./controllers/orders_api"));
app.use("/api", require("./controllers/users_api"));

(async () => {
  try {
    await db.sequelize.sync();
    console.log("Database synced successfully.");

    app.listen(port, () => {
      console.log(`db running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
})();
