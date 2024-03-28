const comment = require("../models/commentModel");

const add = async (req, res) => {
  try {
    const { user , text , blogId } = req.body;
    const commentAdded = await comment.create({
      blogId: blogId,
      text: text,
      user: user,
    });
    res.status(200).json({ message: "Comment Added", comment: commentAdded });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error ": error });
  }
};

const view = async (req, res) => {
  try {
    // const _id = req.params.id;
    const commentView = await comment.find();
    res.status(200).json({ message: "View Comment", comment: commentView });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error ": error });
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const currentBlog = await comment.findOne({ _id: id });
    // console.log(currentBlog.text)z
    console.log(req.body);

    const title = req.body.title ? req.body.title : currentBlog.title;
    const text = req.body.text ? req.body.text : currentBlog.text;
    const commentView = await comment.findOneAndUpdate(
      { _id: id },
      { $set: { title, text } },

      { new: true }
    );
    if (!commentView) return res.status(404).json({ message: "Not Found" });

    res.status(200).json({ message: "Updated Comment", comment: commentView });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error ": error });
  }
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await comment.findOneAndDelete({ _id: id });
    if (deletedBlog)
      res.status(200).json({ message: "Comment Deleted", deletedBlog });
    else res.status(404).json({ message: "Comment Not Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { view, edit, add, deleteComment };
