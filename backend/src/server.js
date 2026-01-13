const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_mysql_password",
  database: "your_database_name"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});
