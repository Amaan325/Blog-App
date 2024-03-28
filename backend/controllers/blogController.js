const blog = require("../models/blogModel");
const upload = require("./multerConfig");

const add = async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Error uploading file" });
      }

      const { title, description, text, username } = req.body;
      const image = req.file;

      console.log(image);

      const blogCreate = await blog.create({
        title: title,
        text: text,
        user: username,
        description: description,
        img: image.path,
      });

      res.status(200).json({ message: "Blog Added", blog: blogCreate });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

const view = async (req, res) => {
  try {
    // const _id = req.params.id;
    const blogView = await blog.find();
    res.status(200).json({ message: "View Blog", blog: blogView });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error ": error });
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const currentBlog = await blog.findOne({ _id: id });
    console.log(req.body);

    const title = req.body.title ? req.body.title : currentBlog.title;
    const text = req.body.text ? req.body.text : currentBlog.text;
    const description = req.body.description
      ? req.body.description
      : currentBlog.description;
    const blogView = await blog.findOneAndUpdate(
      { _id: id },
      { $set: { title, text, description } },

      { new: true }
    );
    if (!blogView) return res.status(404).json({ message: "Not Found" });

    res.status(200).json({ message: "Updated Blog", blog: blogView });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error ": error });
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await blog.findOneAndDelete({ _id: id });
    if (deletedBlog)
      res.status(200).json({ message: "Blog Deleted", deletedBlog });
    else res.status(404).json({ message: "Blog Not Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { view, edit, add, deleteBlog };
