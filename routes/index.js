const express = require("express");

function indexGETHandler(pgClient) {
  return async function (_req, res) {
    const query = `SELECT * FROM Note ORDER BY id;`;

    const { rows = [] } = await pgClient.query(query).catch((error) => {
      console.log(error);
      return [];
    });
    res.render("index", { item: rows });
  };
}

function makeIndexRouter(pgClient) {
  const router = express.Router();

  router.get("/", indexGETHandler(pgClient));

  return router;
}

module.exports = { makeIndexRouter };
