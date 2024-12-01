const db = require("./db/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_SECRET;

function createToken(user) {
  let token;
  try {
    token = jwt.sign(
      {
        user: user.user_id,
        email: user.email,
      },
      JWT_KEY,
      { algorithm: "HS256" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return error;
  }
  return token;
}
async function validateToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Error! Token was not provided or invalid.");
    console.log(error.message);
    throw error;
  }
  const token = authHeader.split(" ")[1];
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    const error = new Error("Error! Token was not provided.");
    console.log(error.message);
    throw error;
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, JWT_KEY);
  return await db.findUserById(decodedToken.user);
}
async function authenticate(req, res) {
  let user;
  try {
    user = await validateToken(req);
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ result: "Invalid bearer token", error: err.message });
  }
  if (user == null) {
    return res.status(403).json({ error: "Illegal request" });
  }
  return null;
}
module.exports = {
  createToken,
  validateToken,
  authenticate,
};
