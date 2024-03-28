const express = require("express");
const path = require("path");

const app = express();
const cors = require("cors");
const cookieParserMiddleware = require("cookie-parser");
const connect = require("./db/connectdb");
require("dotenv").config();
const mainRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const commentRouter = require("./routes/commentRoute");
const port = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParserMiddleware());
app.use("/user", mainRouter);
app.use("/blog", blogRouter);
app.use("/api/blog", commentRouter);
app.listen(port, () => {
  console.log(`Server is listening to the Port : ${port}`);
  connect();
});
