const express = require("express");
const app = express();

//in Express, if you want to send JSON data as request body,
//you need to first parse it as JSON data
app.use(express.json());

app.post("/sum", function (req, res) {
  console.log(req.body);
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.json({
    ans: a + b,
  });
});

app.listen(3000);