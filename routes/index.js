const express = require("express");

function indexGETHandler(context, pgClient) {
  return async function (_req, res) {
    const query = `SELECT * FROM Note ORDER BY id;`;

    const { rows = [] } = await pgClient.query(query).catch((error) => {
      console.log(error);
      return [];
    });
    res.render("index", { context, item: rows });
  };
}

function makeIndexRouter(context, pgClient) {
  const router = express.Router();

  router.get("/", indexGETHandler(context, pgClient));

  return router;
}

module.exports = { makeIndexRouter };
