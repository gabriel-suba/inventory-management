require("dotenv").config();
const pool = require("../database/dbconn");
const queries = require("../database/queries/userQueries");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

/**
 * Payload should be in this order
 * name -> email -> role -> location -> active -> password -> id
 */
const updateUser = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        const userResult = await pool.query(queries.userByIdRaw, [id]);

        if (userResult.rowCount > 0) {
            const user = userResult.rows[0];
            let pw = null;

            if (request.body.password) {
                const salt = await bcrypt.genSalt(10);
                pw = await bcrypt.hash(request.body.password, salt);
            }

            const payload = {
                name: request.body.name ? request.body.name : user.name,
                email: request.body.email ? request.body.email : user.email,
                role: request.body.role ? request.body.role : user.role,
                location: request.body.location
                    ? request.body.location
                    : user.location,
                active: request.body.active ? request.body.active : user.active,
                password: pw,
            };

            const updatedUser = await pool.query(queries.updateUser, [
                payload.name,
                payload.email,
                payload.role,
                payload.location,
                payload.active,
                payload.password,
                id,
            ]);

            if (updatedUser.rowCount > 0) {
                return response.status(200).json({
                    message: `User has been updated: ${updatedUser.rows[0].id}`,
                });
            }
        }
    } catch (error) {
        return response.status(400).json({ message: err.message });
    }
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
        if (error) throw error;

        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

// authentication/authorization
// TODO:: LOGOUT, delete/deactivate user, how to use token for protected routes
const signUpUser = async (request, response) => {
    // roles
    // id |       name
    // ----+-------------------
    //   1 | Admin
    //   2 | Sales Manager
    //   3 | Inventory Manager

    // locations
    // id |     name
    // ----+--------------
    //   1 | Angeles City
    //   2 | Clark
    //   3 | Makati
    const { role, location, name, email, password } = request.body;

    try {
        const emailExists = await pool.query(queries.userByEmail, [email]);

        if (emailExists.rowCount > 0) {
            console.log(emailExists);
            throw Error("Email already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(password, salt);
        const newUser = await pool.query(queries.createUser, [
            role,
            location,
            name,
            email,
            hashedPw,
        ]);

        if (newUser.rowCount > 0) {
            return response.status(201).json({
                message: `User created with ID: ${newUser.rows[0].id}`,
            });
        }
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
};

const signInUser = async (request, response) => {
    const { email, password } = request.body;

    try {
        const res = await pool.query(queries.userByEmail, [email]);
        const user = res.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (user.email === email && passwordMatch) {
            const userToken = generateToken(user);
            response.setHeader("Set-Cookie", `${userToken}; HttpOnly`);
            response.status(200).json({ message: "Login successfull..." });
        } else {
            throw new Error("Credentials incorrect");
        }
    } catch (err) {
        response.status(401).json({ message: err.message });
    }
};

const resetPw = async (request, response) => {
    const { email, password } = request.body;

    try {
        const emailExists = await pool.query(queries.userByEmail, [email]);

        if (emailExists.rowCount === 0) {
            console.log(emailExists);
            throw Error("Email not found");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(password, salt);

        const updatedUser = await pool.query(queries.resetPassword, [
            hashedPw,
            email,
        ]);

        if (updatedUser.rowCount > 0) {
            return response.status(200).json({
                message: `Password has been changed for user: ${updatedUser.rows[0].id}`,
            });
        }
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
};

// move this to a middleware folder...
const verifyAuth = (request, response) => {
    const token = request.get("Set-Cookie");

    jwt.verify(
        token[0].split(";")[0],
        process.env.JWT_SECRET,
        (err, authData) => {
            if (err) {
                response.status(403).json({ message: "Forbidden" });
            } else {
                response.json(authData);
            }
        }
    );
};

const generateToken = (user) =>
    jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });

module.exports = {
    getUsers,
    getUserById,
    signInUser,
    signUpUser,
    verifyAuth,
    resetPw,
    updateUser,
    deleteUser,
};
