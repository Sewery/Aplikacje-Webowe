import ds from "./users.js";
import express from "express";
import auth from "../auth.js";
import bodyParser from "body-parser";
import db from "../db.js";
const { sequelize } = db;
const usersApi = express();
const port = 3003;
usersApi.use(bodyParser.urlencoded({ extended: false }));
usersApi.use(bodyParser.json());

usersApi.post("/api/register", async (req, res) => {
  const [user, created] = await ds.createUser(req.body);
  if (!created) {
    return res
      .status(404)
      .json({ error: "You need to enter diffrent credentials." });
  }
  let token;
  try {
    token = auth.createToken(user);
  } catch (err) {
    res.status(200).json({ result: "Invalid bearer token", error: err.body });
  }
  return res.status(201).json({
    userId: user.user_id,
    result: "Successfully registered",
    token: token,
  });
});
usersApi.post("/api/login", async (req, res) => {
  const user = await ds.loginUser(req.body);
  if (user == null) {
    return res.status(404).json({ error: "Invalid login credentials." });
  }
  let token;
  try {
    token = auth.createToken(user);
  } catch (err) {
    return res
      .status(200)
      .json({ result: "Invalid bearer token", error: err.body });
  }
  return res.status(200).json({
    result: "Successfully logged in",
    token: token,
  });
});
usersApi.get("/api/users", async (req, res) => {
  const users = await ds.getAllUsers();
  return res.status(200).json({ users });
});
(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully, for users api.");

    usersApi.listen(port, () => {
      console.log(`users api running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
})();
