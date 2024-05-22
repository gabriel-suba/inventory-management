const Pool = require("pg").Pool;

const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 8001,
});

const queries = require("./queries");

// items
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

// users
const getUsers = (request, response) => {
    pool.query(queries.users, (error, results) => {
        if (error) throw error;

        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(queries.userById, [id], (error, results) => {
        if (error) throw error;

        response.status(200).json(results.rows);
    });
};

module.exports = { getItems, getItemById, getUsers, getUserById };
