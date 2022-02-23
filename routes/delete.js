const express = require("express");

function deleteGETHandler(pgClient) {
  return async function (req, res) {
    const query = `DELETE FROM Note WHERE id=$1 RETURNING *;`;
    const values = [req.params.id];

    await pgClient.query(query, values);
    res.redirect(`${global.baseUrl}/`);
  };
}

function makeDeleteRouter(pgClient) {
  const router = express.Router();

  router.get("/:id", deleteGETHandler(pgClient));

  return router;
}

module.exports = { makeDeleteRouter };
