const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const register = async (req, res) => {
  try {
    const userExists = await user.findOne({ username: req.body.username });
    if (userExists) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const password = req.body.password;
    // if (password.length < 8)
    //   res.status(400).json("Password should not be less than 8 characters");
    // password = bcrypt.hashSync(req.body.password, salt);
    const token = jwt.sign(
      { username: req.body.username },
      process.env.secret_key
    );
    userSaved = await user.create({
      username: req.body.username,
      password: password,
    });
    res.status(200).json({ user: userSaved });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const login = async (req, res) => {
  console.log("Username " + req.body.username);
  const userExists = await user.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (!userExists) {
    return res.status(401).json({ error: "User not exists" });
  }
  const token = jwt.sign(
    { username: req.body.username },
    process.env.secret_key
  );
  res.cookie("token", token);
  res.status(200).json({ user: userExists });
};

const verify = async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.secret_key, (error, info) => {
    if (error) res.status(401).json("Unauthorized");
    else res.status(200).json({ user: info });
  });
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).end();
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { register, login, verify, logout };
