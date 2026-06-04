//typescript: compile time strictness, therefore we need zod for dynamic websites (zod is for runtime strictness)

import express from "express";

const app = express();

interface SignupInput {
  username: string;
  password: string;
}

app.post("/signup", (req, res) => {
  const body: SignupInput = req.body;

  res.json({
    message: "signed up",
  });
});

interface user {
  name: string;
  age: number;
}

function isLegal(user: user): boolean {
  if (user.age >= 18) return true;
  return false;
}

let user1: user = {
  name: "pranay",
  age: 18,
};

console.log(isLegal(user1));
