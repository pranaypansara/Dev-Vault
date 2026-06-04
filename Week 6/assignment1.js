const express = require("express");
const app = express();
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
    message: "You are signed-up!",
  });
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  //maps and fiter
  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      foundUser = users[i];
    }
  }

  if (foundUser) {
    //encoding info json to a jwt
    const token = jwt.sign({ username: username }, JWT_SECRET);
    res.json({
      message: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(403).send({
          message: "Unauthorized",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({
      message: "Unauthorized",
    });
  }
}

app.get("/me", auth, function (req, res) {
  const username = req.user.username;
  const foundUser = users.find((user) => user.username === username);

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.send({
      message: "Unauthorized",
    });
  }
});

app.listen(3000);