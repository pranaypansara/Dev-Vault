const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "preview courses",
  });
});

courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "purchase courses",
  });
});

module.exports = {
  courseRouter: courseRouter,
};