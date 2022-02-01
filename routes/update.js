const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/:id", async (req, res) => {
  const query = `SELECT * FROM Note WHERE id=$1;`;

  const values = [req.params.id];
  const { rows } = await db.query(query, values);
  res.render("update", { data: rows[0] });
});

router.post("/:id", async (req, res) => {
  const query = `UPDATE Note SET title=$1, body=$2 WHERE id=$3 RETURNING *;`;
  const values = [req.body.title, req.body.body, req.params.id];
  const { rows } = await db.query(query, values);
  res.redirect("/");
});

module.exports = router;
