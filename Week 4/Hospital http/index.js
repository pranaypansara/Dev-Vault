const express = require("express");
const app = express();
app.use(express.json());

var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.get("/", function (req, res) {
  const johnKidneys = users[0].kidneys;
  const nkidneys = johnKidneys.length;
  let nhealthykidneys = 0;
  for (let i = 0; i < nkidneys; i++) {
    if (johnKidneys[i].healthy) {
      nhealthykidneys += 1;
    }
  }
  const nunhealthykidneys = nkidneys - nhealthykidneys;

  res.json({
    nkidneys,
    nhealthykidneys,
    nunhealthykidneys,
  });
});

app.post("/", function (req, res) {
  const isHealthy = req.body.healthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

//converts all kidneys to healthy
app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({
    msg: "Done!",
  });
});

//deletes all unhealty kidneys
app.delete("/", function (req, res) {
  //return 411 error if there is no unhealthy kidney
  let atleastoneunhealthy = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy == false) {
      users[0].kidneys.splice(i, 1);
      atleastoneunhealthy = true;
    }
  }
  if (atleastoneunhealthy) {
    res.json({
      msg: "Done!",
    });
  }
  else{
    res.status(411).json({
        msg: "You have no bad kidneys"
    })
  }
});

app.listen(3000);
