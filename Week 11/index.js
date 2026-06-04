const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { JWT_SECRET, authMiddleware } = require("./middleware");
const mongoose = require("mongoose");
mongoose.connect("");
const { userModel } = require("./models");
const { todoModel } = require("./models");
app.use(express.json());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExist = await userModel.findOne({
    username: username,
    password: password,
  });

  if (userExist) {
    res.status(403).json({
      message: "user already exists",
    });
  } else {
    await userModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "You are signed up!",
    });
  }
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExist = await userModel.findOne({
    username: username,
    password: password,
  });

  if (!userExist) {
    res.status(403).json({
      message: "incorrect credentials",
    });
  }

  const token = jwt.sign({ userId: userExist._id.toString() }, JWT_SECRET);
  res.json({
    token: token,
  });
});

app.post("/todo", authMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.userId;

  await todoModel.create({
    title: title,
    description: description,
    userId: userId,
  });

  res.json("Todo created");
});

app.get("/todo", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const todos = await todoModel.find({
    userId: userId,
  });
  res.json({
    todos: todos,
  });
});

app.listen(3000);
