const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { authMiddleware, JWT_SECRET } = require("./middleware");
const { userModel, organisationModel } = require("./models");

app.use(express.json());

// CREATE ENDPOINTS
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await userModel.findOne({
    username: username,
  });

  if (userExists) {
    res.status(411).json({
      message: "User already exists",
    });
    return;
  }

  await userModel.create({
    username,
    password,
  });

  res.json({
    message: "You have signed up successfully",
  });
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await userModel.findOne({
    username: username,
    password: password,
  });

  if (!userExists) {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
    return; // FIX
  }

  const token = jwt.sign(
    {
      userId: userExists._id.toString(),
    },
    JWT_SECRET,
  );

  res.json({
    token: token,
  });
});

app.post("/organisation", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const newOrg = await organisationModel.create({
    title: req.body.title,
    description: req.body.description,
    admin: userId,
    members: [],
  });

  res.json({
    message: "Org Created",
    id: newOrg._id,
  });
});

app.post("/add-member-to-organisation", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const organisationId = req.body.organisationId;
  const memberUsername = req.body.memberUsername;

  const organisation = await organisationModel.findOne({
    _id: organisationId,
  });

  if (!organisation || organisation.admin.toString() !== userId) {
    res.status(411).json({
      message: "You are not the admin",
    });
    return;
  }

  const memberUser = await userModel.findOne({
    username: memberUsername,
  });

  if (!memberUser) {
    res.status(403).json({
      message: "User doesnt exist",
    });
    return;
  }

  // await organisationModel.updateOne(
  //   {
  //     _id: organisationId,
  //   },
  //   {
  //     $push: {
  //       members: memberUser._id,
  //     },
  //   }
  // );

  organisation.members.push(memberUser._id);
  await organisation.save();

  res.json({
    message: "New member added",
  });
});

app.post("/board", (req, res) => {});

app.post("/issue", (req, res) => {});

// READ ENDPOINTS
app.get("/boards", (req, res) => {});

app.get("/issue", (req, res) => {});

app.get("/organisation", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const organisationId = req.query.organisationId; // FIX

  const organisation = await organisationModel.findOne({
    _id: organisationId,
  });

  if (!organisation || organisation.admin.toString() !== userId) {
    res.status(411).json({
      message: "You are not the admin",
    });
    return;
  }

  const members = await userModel.find({
    _id: organisation.members,
  });

  res.json({
    organisation: {
      title: organisation.title,
      description: organisation.description,
      members: members.map((m) => ({
        username: m.username,
        id: m._id,
      })),
    },
  });
});

// UPDATE ENDPOINTS
app.put("/issue", (req, res) => {});

// DELETE ENDPOINTS
app.delete("/members", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const organisationId = req.body.organisationId;
  const memberUsername = req.body.memberUsername;

  const organisation = await organisationModel.findOne({
    _id: organisationId,
  });

  if (!organisation || organisation.admin.toString() !== userId) {
    res.status(411).json({
      message: "You are not the admin",
    });
    return;
  }

  const memberUser = await userModel.findOne({
    username: memberUsername,
  });

  if (!memberUser) {
    res.status(403).json({
      message: "User doesnt exist",
    });
    return;
  }

  // await organisationModel.updateOne(
  //   {
  //     _id: organisationId,
  //   },
  //   {
  //     $pull: {
  //       members: memberUser._id, // FIX
  //     },
  //   },
  // );

  organisation.members = organisation.members.filter(
    (x) => x.toString() !== memberUser._id.toString(),
  );
  await organisation.save();

  res.json({
    message: "Member removed", // FIX
  });
});

app.listen(3000);
