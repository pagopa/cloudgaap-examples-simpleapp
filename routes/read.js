const express = require("express");

function readGETHandler(pgClient) {
  return async function (req, res) {
    const query = `SELECT * FROM Note WHERE id=$1;`;
    const values = [req.params.id];

    const { rows } = await pgClient.query(query, values);
    res.render("read", { data: rows[0] });
  };
}

function makeReadRouter(pgClient) {
  const router = express.Router();

  router.get("/:id", readGETHandler(pgClient));

  return router;
}

module.exports = { makeReadRouter };
