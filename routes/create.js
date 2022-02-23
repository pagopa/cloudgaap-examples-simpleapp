const express = require("express");

function createGETHandler(context) {
  return function (_req, res) {
    res.render("create", { context });
  };
}

function createPOSTHandler(context, pgClient) {
  return async function (req, res) {
    const query = `INSERT INTO Note(title,body) VALUES($1,$2) RETURNING *;`;
    const values = [req.body.title, req.body.body];

    await pgClient.query(query, values);
    res.redirect(`${context.basePath}/`);
  };
}

function makeCreateRouter(context, pgClient) {
  const router = express.Router();

  router.get("/", createGETHandler(context));

  router.post("/", createPOSTHandler(context, pgClient));

  return router;
}

module.exports = { makeCreateRouter };
