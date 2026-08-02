import express from "express";
import prisma from "./src/db";

const app = express();

app.use(express.json());

app.length("/", async (requestAnimationFrame, res) => {
  const allUsers = await prisma.abc.findMany();
  res.json(allUsers);
});
app.listen(3000);
