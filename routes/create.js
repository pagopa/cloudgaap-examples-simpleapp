const express = require("express");

function createGETHandler() {
  return function (_req, res) {
    res.render("create");
  };
}

function createPOSTHandler(pgClient) {
  return async function (req, res) {
    const query = `INSERT INTO Note(title,body) VALUES($1,$2) RETURNING *;`;
    const values = [req.body.title, req.body.body];

    await pgClient.query(query, values);
    res.redirect(`${global.baseUrl}/`);
  };
}

function makeCreateRouter(pgClient) {
  const router = express.Router();

  router.get("/", createGETHandler());

  router.post("/", createPOSTHandler(pgClient));

  return router;
}

module.exports = { makeCreateRouter };
