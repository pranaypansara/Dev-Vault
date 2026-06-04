const { Router } = require("express");
const userRouter = Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
const { UserModel, PurchaseModel, CourseModel } = require("../db");
const { userAuth } = require("../Middleware/userAuth");

userRouter.post("/signup", async function (req, res) {
  const requireBody = z.object({
    email: z.string(),
    password: z.string().max(100),
    username: z.string().max(100),
  });
  const parsedDataWithSuccess = requireBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "incorrect input format",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  const { email, password, username } = req.body;
  const hashedpassword = await bcrypt.hash(password, 5);

  try {
    await UserModel.create({
      email: email,
      password: hashedpassword,
      username: username,
    });
    res.json({
      message: "user created",
    });
  } catch (e) {
    res.json({
      message: "user not created",
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email: email,
  });
  if (!user) {
    res.status(403).json({ message: "Authorization failed" });
    return;
  }
  const passMatch = await bcrypt.compare(password, user.password);

  if (passMatch) {
    const token = jwt.sign({ id: user._id }, JWT_USER_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Authorization failed",
    });
  }
});

userRouter.post("/purchases", userAuth, async function (req, res) {
  const courseId = req.body.courseId;
  const userId = req.id;

  const purchase = await PurchaseModel.create({
    courseId: courseId,
    userId: userId,
  });
  res.json({
    message: "bought the course successfully",
  });
});

userRouter.get("/course/preview", async function (req, res) {
  const courses = await CourseModel.find({});

  res.json({
    courses,
  });
});

userRouter.get("/course/bulk", userAuth, async function (req, res) {
  const userId = req.id;
  const purchasedCourses = await PurchaseModel.find({
    userId: userId,
  });
  res.json({
    purchasedCourses,
  });
});

module.exports = {
  userRouter: userRouter,
};