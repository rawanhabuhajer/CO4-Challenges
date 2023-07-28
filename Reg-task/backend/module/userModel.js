const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please inter your name"],
    },
    email: {
      type: String,
      required: [true, "Please inter your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    confirmPassword: {
      type: String,
      required: true,
      validate: {
        //only work with create and save
        validator: function (el) {
          return el === this.password;
        },
        message: "this password not the same",
      },
    },
  },

  { collection: "User" }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //hash the password
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined; //delete the confirm because we dont need it any more in database
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
