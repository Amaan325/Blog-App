const express = require("express");
const {
  register,
  login,
  verify,
  logout,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").get(register).post(register);
router.route("/login").get(login).post(login);
router.route("/profile").get(verify);
router.route("/logout").get(logout);

module.exports = router;
