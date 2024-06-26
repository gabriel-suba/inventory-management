const Pool = require("pg").Pool;

const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 8001,
});

const getUsers = (request, response) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;

        response.status(200).json(results.rows);
    });
};

const getUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
        if (error) throw error;

        response.status(200).json(results.rows);
    });
};

const addUser = (request, response) => {
    const { name, email } = request.body;

    pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email],
        (error, results) => {
            if (error) throw error;

            response
                .status(200)
                .send(`User added with ID: ${results.rows[0].id}`);
        }
    );
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3",
        [name, email, id],
        (error, results) => {
            if (error) throw error;

            if (results.rowCount > 0) {
                response.status(200).send(`User modified with ID: ${id}`);
            } else {
                response.status(404).send(`User with ID: ${id} can't be found`);
            }
        }
    );
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
        if (error) throw error;

        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
};
