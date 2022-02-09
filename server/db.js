const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "university",
    port: 5432,
    password: "auto",
}
);

module.exports = pool;
