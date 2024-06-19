const pool = require("../database/dbconn");
const queries = require("../database/queries/itemQueries");

const getItems = (request, response) => {
    pool.query(queries.items, (error, results) => {
        if (error) {
            console.error("Error retrieving items:", error);
            return response
                .status(500)
                .json({ error: "Failed to retrieve items" });
        }

        response.status(200).json(results.rows);
    });
};

const getItemById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(queries.itemById, [id], (error, results) => {
        if (error) {
            console.error("Error retrieving item by ID:", error);
            return response
                .status(500)
                .json({ error: "Failed to retrieve item" });
        }

        response.status(200).json(results.rows);
    });
};
/**
 * Order of payload
 * location -> status -> vendor -> name -> quantity -> active
 */
const createItem = async (request, response) => {
    const { name, quantity, status, vendor, location, active } = request.body;

    try {
        if (!name || !quantity) {
            return response
                .status(400)
                .json({ message: "Name and Quantity Fields are required." });
        }

        const newItem = await pool.query(queries.createItem, [
            location || null,
            status || null,
            vendor || null,
            name,
            quantity,
            active || true,
        ]);

        if (newItem.rowCount > 0) {
            return response.status(200).json({
                message: `Item has been created: ${newItem.rows[0].id}`,
            });
        }
    } catch (error) {
        console.error("Error creating item:", error);
        return response.status(500).json({ message: error.message });
    }
};

/**
 * Updates an existing item in the database.
 * Order of payload: name -> quantity -> status -> vendor -> location -> active
 */
const updateItem = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        const payload = {
            name: request.body.name || null,
            quantity: request.body.quantity || null,
            status: request.body.status || null,
            vendor: request.body.vendor || null,
            location: request.body.location || null,
            active: request.body.active || null,
        };

        const updatedItem = await pool.query(queries.updateItem, [
            payload.name,
            payload.quantity,
            payload.status,
            payload.vendor,
            payload.location,
            payload.active,
            id,
        ]);

        if (updatedItem.rowCount > 0) {
            return response.status(200).json({
                message: `Item has been updated: ${updatedItem.rows[0].id}`,
            });
        } else {
            return response.status(400).json({ message: "Item update failed" });
        }
    } catch (error) {
        console.error("Error updating item:", error);
        return response.status(500).json({ message: error.message });
    }
};

const deleteItem = (request, response) => {
    pool.query(queries.deleteItem, [request.params.id], (error, results) => {
        if (error) {
            console.error("Error deleting item:", error);
            return response
                .status(500)
                .json({ error: "Failed to delete item" });
        }

        if (results.rowCount > 0) {
            response.status(200).json(`Item deleted with ID: ${id}`);
        } else {
            response.status(404).json(`Item not found with ID: ${id}`);
        }
    });
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };
