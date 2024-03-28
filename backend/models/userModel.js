const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [6, "Username should be atleast 6 characters"],
      validate: {
        validator: function (value) {
          return value.startsWith("@");
        },
        message: "Username should starts with @",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password should be more than 7 characters"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", UserSchema);
