const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const z = require("zod");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "neon connection string",
});
pool.connect()

app.use(express.json());

const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});
app.post("/signup", async (req, res) => {
  const { data, success } = signupSchema.safeParse(req.body);
  if (!success) {
    res.status(403).json({
      message: "Incorrect inputs",
    });
  }

  const username = data.username;
  const password = data.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
    [username, hashedPassword],
  );

  res.json({
    message: "user created successfully",
    id: response.rows[0].id,
  });
});



app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const response = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  const userExists = response.rows[0];

  if (!userExists) {
    res.status(403).json({
      message: "Incorrect creds",
    });
  } else {
    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (passwordMatch) {
      res.json({
        token: "jibberish",
      });
    } else {
      res.json({
        message: "incorrect creds",
      });
    }
  }
});

app.listen(3000);