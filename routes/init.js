const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", async (req, res) => {
  const init = `CREATE TABLE IF NOT EXISTS note (title varchar(40) NOT NULL,body varchar(40) NOT NULL,id SERIAL PRIMARY KEY);`;
  await db.query(init).catch((error) => console.log(error));
  res.redirect("/");
});

module.exports = router;
