const express = require("express");
const {
  view,
  edit,
  add,
  deleteBlog,
} = require("../controllers/blogController");
const router = express.Router();

router.route("/add").post(add);
// router.route("/view/:id").get(view);
router.route("/view").get(view);
router.route("/update/:id").post(edit);
router.route("/delete/:id").get(deleteBlog);

module.exports = router;
