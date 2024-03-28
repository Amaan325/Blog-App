const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description : {
      type : String ,
      required : true ,
    } ,
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", BlogSchema);
