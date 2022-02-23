const express = require("express");

function readGETHandler(context, pgClient) {
  return async function (req, res) {
    const query = `SELECT * FROM Note WHERE id=$1;`;
    const values = [req.params.id];

    const { rows } = await pgClient.query(query, values);
    res.render("read", { context, data: rows[0] });
  };
}

function makeReadRouter(context, pgClient) {
  const router = express.Router();

  router.get("/:id", readGETHandler(context, pgClient));

  return router;
}

module.exports = { makeReadRouter };
