const express = require("express");
const { add, view } = require("../controllers/commentController");

const router = express.Router();

router.route("/comments").get(view);
router.route("/comment").post(add);

module.exports = router;
