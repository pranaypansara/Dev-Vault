const { Router } = require("express");
const adminRouter = Router();
const { AdminModel, CourseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const { z } = require("zod");
const { adminAuth } = require("../Middleware/adminAuth");

adminRouter.post("/signup", async function (req, res) {
  const requireBody = z.object({
    email: z.string(),
    password: z.string().max(20),
    name: z.string().max(20),
  });
  const parsedDataWithSuccess = requireBody.safeParse(req.body);
  if (!parsedDataWithSuccess) {
    res.json({
      message: "incorrect input format",
    });
    return;
  }

  const { email, password, name } = req.body;
  const hashedpassword = await bcrypt.hash(password, 5);

  try {
    await AdminModel.create({
      email: email,
      password: hashedpassword,
      name: name,
    });
    res.json({
      message: "admin created",
    });
  } catch (e) {
    res.status(503).json({
      message: "admin not created",
    });
  }
});

adminRouter.post("/signin", async function (req, res) {
  const { username, password } = req.body;
  const email = username || req.body.email;

  const admin = await AdminModel.findOne({
    email: email,
  });
  if (!admin) {
    res.status(403).json({ message: "authorization failed" });
    return;
  }
  const passMatch = await bcrypt.compare(password, admin.password);

  if (passMatch) {
    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "authorization failed",
    });
  }
});

adminRouter.post("/course", adminAuth, async function (req, res) {
  const creatorId = req.id;
  const { title, description, price, imageUrl } = req.body;
  const course = await CourseModel.create({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    creatorId: creatorId,
  });
  res.json({
    message: "new course created",
    courseId: course._id,
  });
});

adminRouter.put("/course/update", adminAuth, async function (req, res) {
  const creatorId = req.id;
  const { title, description, price, imageUrl, courseId } = req.body;

  const course = await CourseModel.updateOne(
    {
      _id: courseId,
      creatorId: creatorId,
    },
    {
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
    },
  );
  res.json({
    message: "course updated",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminAuth, async function (req, res) {
  const creatorId = req.id;
  const allCourses = await CourseModel.find({
    creatorId: creatorId,
  });
  res.json({
    allCourses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
