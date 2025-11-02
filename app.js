const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// ✅ Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "threat_report_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

// ✅ Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// ✅ Home page (form)
app.get("/", (req, res) => {
  res.render("index");
});

// ✅ Handle form submission
app.post("/submit", (req, res) => {
  const { name, email, location, category, description, number } = req.body;

  // Save user (insert or update)
  db.query(
    "INSERT INTO users (name, email, location) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), location = VALUES(location)",
    [name, email, location],
    (err, result) => {
      if (err) throw err;

      // Get the user's ID (works for new or existing user)
      const userId = result.insertId || result.insertId === 0 ? result.insertId : null;

      // Save the threat
      db.query(
        "INSERT INTO threats (user_id, category, description, location, number) VALUES (?, ?, ?, ?, ?)",
        [userId, category, description, location, number],
        (err2) => {
          if (err2) throw err2;
          res.send("<h2>✅ Threat Report Submitted Successfully!</h2><a href='/'>Back</a>");
        }
      );
    }
  );
});

// ✅ Admin page (view all threats with user details)
app.get("/admin", (req, res) => {
  db.query(
    `SELECT t.threat_id, u.name, u.email, t.category, t.description, t.location, t.number
     FROM threats t
     JOIN users u ON t.user_id = u.user_id
     ORDER BY t.threat_id DESC`,
    (err, results) => {
      if (err) throw err;
      res.render("admin", { data: results });
    }
  );
});

// ✅ Start server
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
