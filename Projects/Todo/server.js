const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomsecret";

app.use(express.json());

let users = [];

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const alrExist = users.find((user) => user.username === username);

  if (alrExist) {
    res.status(403).send({
      message: "User already exists",
    });
  } else {
    users.push({
      username: username,
      password: password,
      todos: [],
    });
    res.json({
      message: "You are now signed up!",
    });
  }
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const userFound = users.find(
    (user) => user.username === password || user.password === password
  );

  if (userFound) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).send({
      message: "invalid credentials",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(403).send({
          message: "unauthorized due to error in token",
        });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).send({
      message: "unauthorized",
    });
  }
}

app.get("/todo", auth, function (req, res) {
  const username = req.username;
  const userFound = users.find((user) => user.username === username);

  if (userFound) {
    res.json({
      todos: userFound.todos,
    });
  } else {
    res.send({
      message: "unauthorized cause user not found",
    });
  }
});

app.post("/todo", auth, function (req, res) {
  const username = req.username;
  const todo = req.body.todo;
  const userFound = users.find((user) => user.username === username);

  if (userFound) {
    userFound.todos.push(todo);
    res.send({
      message: "todo added!",
    });
  } else {
    res.status(403).send({
      message: "unauthorized as user not found",
    });
  }
});

app.delete("/todo", auth, function (req, res) {
  const username = req.username;
  const index = parseInt(req.body.index);
  const userFound = users.find((user) => user.username === username);

  if (userFound) {
    userFound.todos.splice(index, 1);
    res.send({
      message: "todo deleted",
    });
  } else {
    res.status(403).send({
      message: "unauthorized as user not found",
    });
  }
});

app.put("/todo", auth, function (req, res) {
  const username = req.username;
  const edit = req.body.edit;
  const index = parseInt(req.body.index);
  const userFound = users.find((user) => user.username === username);

  if (userFound) {
    userFound.todos[index] = edit;
    res.send({
      message: "edited!",
    });
  } else {
    res.send({
      message: "unauthorized as user not found",
    });
  }
});

app.listen(3000);
