const pool = require("../database/dbconn");
const queries = require("../database/queries/roleQueries");

const getRoles = (request, response) => {
  pool.query(queries.roles, (error, results) => {
    if (error) {
      console.error("Error retrieving roles:", error);
      return response.status(500).json({ error: "Failed to retrieve Roles" });
    }

    response.status(200).json(results.rows);
  });
};

const getRoleById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(queries.roleById, [id], (error, results) => {
    if (error) {
      console.error("Error retrieving location:", error);
      return response.status(500).json({ error: "Failed to retrieve role" });
    }

    response.status(200).json(results.rows);
  });
};

module.exports = {
  getRoles,
  getRoleById,
};
