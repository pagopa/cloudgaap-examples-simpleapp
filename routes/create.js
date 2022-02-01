const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
  res.render("create");
});

router.post("/", async (req, res) => {
  const query = `INSERT INTO Note(title,body) VALUES($1,$2) RETURNING *;`;
  const values = [req.body.title, req.body.body];
  await db.query(query, values);
  res.redirect("/");
});

module.exports = router;
