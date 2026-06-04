const express = require("express");
const app = new express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jibberish";

app.use(express.json());
const users = [];

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "You are now signed up!",
  });
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let userfound = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (userfound) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).send({
      message: "invalid username or password",
    });
  }
});

function auth(req, res, send) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(403).send({
          message: "unauthorized",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({
      message: "unauthorized",
    });
  }
}

app.get("/me", auth, function (req, res) {
  const username = req.user.username;
  const userfound = users.find((user) => user.username === username);
  if (userfound) {
    res.json({
      username: username,
      password: password,
    });
  } else {
    res.status(403).send({
      message: "unauthorized",
    });
  }
});
