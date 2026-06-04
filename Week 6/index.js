const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jibberish";

app.use(express.json());

const users = [];

app.get("/", function (req, res) {
  res.sendFile(__dirname+"/public/index.html");
});

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
      token: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.get("/me", function (req, res) {
  const token = req.headers.token; //jwt
  //decoding a jwt to the info json
  const decodedInfo = jwt.verify(token, JWT_SECRET); //{username: pranay}
  const username = decodedInfo.username;

  //same as the for loop in maps and filter
  const foundUser = users.find((user) => user.username === username);

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "Authorization failed due to invalid token",
    });
  }
});

app.listen(3000);
