const { Pool } = require("pg");

function makePGClient(connectionString) {
  const pool = new Pool({
    connectionString,
  });

  return {
    query: async (text, params) => pool.query(text, params),

    init: async () => {
      const init = `CREATE TABLE IF NOT EXISTS note (title varchar(40) NOT NULL,body varchar(40) NOT NULL,id SERIAL PRIMARY KEY);`;
      await pool.query(init);
    },
  };
}

module.exports = { makePGClient };
