//all database functions used returns a promise so we use async await before proceeding further

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomsecret";
const mongoose = require("mongoose");
mongoose.connect(
  ""
);
const { UserModel, TodoModel } = require("./db");

app.use(express.json());
app.post("/signup", async function (req, res) {
  const requiresBody = z.object({
    email: z.email(),
    name: z.string().max(100),
    password: z
      .string()
      .max(100)
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain one special character"),
  });
  const parsedDataWithSuccess = requiresBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "incorrect format",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  //we can use this as callback but also turn this bcrypt function into a promise
  const hashedpassword = await bcrypt.hash(password, 5);

  await UserModel.create({
    email: email,
    password: hashedpassword,
    name: name,
  });

  res.json({
    message: "You are signed-up!",
  });
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
  });

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (user && passwordMatch) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.statusCode(403).json({
      message: "Incorrect Credentials",
    });
  }
});

function auth(req, res, next) {
  token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        res.statusCode(403).json({
          message: "Unauthorized due to invalid token",
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.statusCode(403).json({
      message: "Unauthorized due to invalid token",
    });
  }
}

app.post("/todo", auth, async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  await TodoModel.create({
    title: title,
    done: false,
    userId: userId,
  });
  res.json({
    message: "todo added",
  });
});

app.get("/todo", auth, async function (req, res) {
  const userId = req.userId;
  const todos = await TodoModel.find({
    userId: userId,
  });
  res.json({
    todos,
  });
});

app.listen(3000);
