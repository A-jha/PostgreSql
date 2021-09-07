const express = require("express");

const cors = require("cors");

const app = express();

const PORT = 5000;

const pool = require("./db");

//middleware for cors
app.use(cors());

//to get access to response body
app.use(express.json());

//setting up routes Routes
app.get("/users", async (req, res) => {
  try {
    const { name } = req.query;

    const users = await pool.query(
      "SELECT * FROM users WHERE first_name || ' '|| last_name ILIKE  $1",
      [`%${name}%`]
    );

    users.rowCount
      ? res.json(users)
      : res.json({ message: "data is not matching" });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`port:  running on PORT:${PORT}\nvisit: http://localhost:5000 `);
});
