const db = require("../db/users");
const auth = require("../auth");
var express = require("express");

var usersApi = express.Router();

usersApi.post("/register", async (req, res) => {
  const [user, created] = await db.createUser(req.body);
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
    result: "Successfully registered",
    token: token,
  });
});
usersApi.post("/login", async (req, res) => {
  const user = await db.loginUser(req.body);
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
usersApi.get("/users", async (req, res) => {
  const users = await db.getAllUsers();
  return res.status(200).json({ users });
});
module.exports = usersApi;
