const express = require("express");
const server = require("./db/server");
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
    // Sync database
    await server.sequelize.sync(); // Adjust database schema to match models
    console.log("Database synced successfully.");

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1); // Exit if the database fails to sync
  }
})();
