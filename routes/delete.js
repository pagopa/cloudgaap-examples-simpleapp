const express = require("express");

function deleteGETHandler(context, pgClient) {
  return async function (req, res) {
    const query = `DELETE FROM Note WHERE id=$1 RETURNING *;`;
    const values = [req.params.id];

    await pgClient.query(query, values);
    res.redirect(`${context.basePath}/`);
  };
}

function makeDeleteRouter(context, pgClient) {
  const router = express.Router();

  router.get("/:id", deleteGETHandler(context, pgClient));

  return router;
}

module.exports = { makeDeleteRouter };
