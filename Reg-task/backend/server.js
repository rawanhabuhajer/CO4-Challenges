const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./module/userModel");
const app = express();
const port = 8060;
app.use(express.json());
app.use(cors());
const jwt = require("jsonwebtoken");

const signToken = (_id , username , email) => {
  return jwt.sign({ id:_id , username:username , email:email}, "secret-ultra-secure");
};

mongoose.connect("mongodb://0.0.0.0:27017/user");

app.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.json({ status: "error", error: "dublicated-email" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  //check if email or password exist
  if (!email || !password) {
    return res.status(400).json({
      status: "please enter email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "incorrect email or password",
    });
  }
  console.log(user);

  const token = jwt.sign({
    username: user.username,
    email: user.email,
  }, "secret-ultra-secure");
  res.status(200).json({
    status: "sucsses",
    token,
  });
  console.log(token)
});

app.get("/profile", async (req, res) => {
  const userId = req.user._id;
  console.log(userId)
  const { email, username } = await User.findOne({ _id: userId });

  res.json({
    username,
    email,
  });
});
app.listen(port, () => {
  console.log(`listen to port ${port}`);
});
