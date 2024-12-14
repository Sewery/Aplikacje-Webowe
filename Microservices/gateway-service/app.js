import axios from "axios";
// const port = 3000;
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use("/api/books", require("../books-service/books_api"));
// app.use("/api/orders", require("../orders-service/orders_api"));
// app.use("/api", require("../users-service/users_api"));

// communicator/index.js
// const axios = require("axios");

class Communicator {
  constructor() {
    this.bookServiceClient = axios.create({
      baseURL: "http://localhost:3001/api/books",
    });
    this.orderServiceClient = axios.create({
      baseURL: "http://localhost:3002/api/orders",
    });
    this.userServiceClient = axios.create({
      baseURL: "http://localhost:3003/api",
    });
  }
}
