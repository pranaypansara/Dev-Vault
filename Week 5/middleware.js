const express = require("express");
const app = new express();

const requestCount = 0;
function requestIncreaser(req, res, next) {
  requestCount++;
  next();
}

function realSumHandler(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a+b,
    total_requests: requestCount
  })
}

app.get("/sum", requestIncreaser, realSumHandler());

app.listen(3000);