const express = require("express");

function updateGETHandler(pgClient) {
  return async function (req, res) {
    const query = `SELECT * FROM Note WHERE id=$1;`;
    const values = [req.params.id];

    const { rows } = await pgClient.query(query, values);
    res.render("update", { data: rows[0] });
  };
}

function updatePOSTHandler(pgClient) {
  return async function (req, res) {
    const query = `UPDATE Note SET title=$1, body=$2 WHERE id=$3 RETURNING *;`;
    const values = [req.body.title, req.body.body, req.params.id];

    await pgClient.query(query, values);
    res.redirect("/");
  };
}

function makeUpdateRouter(pgClient) {
  const router = express.Router();

  router.get("/:id", updateGETHandler(pgClient));

  router.post("/:id", updatePOSTHandler(pgClient));

  return router;
}

module.exports = { makeUpdateRouter };
