const pool = require("../database/dbconn");
const queries = require("../database/queries/itemQueries");

const getItems = (request, response) => {
    pool.query(queries.items, (error, results) => {
        if (error) throw error;

        response.status(200).json(results.rows);
    });
};

const getItemById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(queries.itemById, [id], (error, results) => {
        if (error) throw error;

        response.status(200).json(results.rows);
    });
};

module.exports = { getItems, getItemById };
