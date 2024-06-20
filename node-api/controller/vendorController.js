const pool = require("../database/dbconn");
const queries = require("../database/queries/vendorQueries");

const getVendors = (request, response) => {
    pool.query(queries.vendors, (error, results) => {
        if (error) {
            console.error("Error retrieving vendors:", error);
            return response
                .status(500)
                .json({ error: "Failed to retrieve vendors" });
        }

        response.status(200).json(results.rows);
    });
};

const getVendorById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(queries.vendorById, [id], (error, results) => {
        if (error) {
            console.error("Error retrieving vendors:", error);
            return response
                .status(500)
                .json({ error: "Failed to retrieve vendors" });
        }

        response.status(200).json(results.rows);
    });
};

/**
 * When creating/updating vendors
 * Order of payload: name -> email -> phone -> active
 */
const createVendor = async (request, response) => {
    const { name, email, phone, active } = request.body;

    try {
        if (!name || !email) {
            return response
                .status(400)
                .json({ message: "Name and Email Fields are required." });
        }

        const newVendor = await pool.query(queries.createVendor, [
            name,
            email,
            phone || null,
            active || true,
        ]);

        if (newVendor.rowCount > 0) {
            return response.status(200).json({
                message: `Vendor has been created: ${newVendor.rows[0].id}`,
            });
        }
    } catch (error) {
        console.error("Error creating vendor:", error);
        return response.status(500).json({ message: error.message });
    }
};

/**
 * When creating/updating vendors
 * Order of payload: name -> email -> phone -> active
 */
const updateVendor = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        const payload = {
            name: request.body.name || null,
            email: request.body.email || null,
            phone: request.body.phone || null,
            active: request.body.active || null,
        };

        const updatedVendor = await pool.query(queries.updateVendor, [
            payload.name,
            payload.email,
            payload.phone,
            payload.active,
            id,
        ]);

        if (updatedVendor.rowCount > 0) {
            return response.status(200).json({
                message: `Vendor has been updated: ${updatedVendor.rows[0].id}`,
            });
        } else {
            return response
                .status(400)
                .json({ message: "Vendor update failed" });
        }
    } catch (error) {
        console.error("Error updating vendor:", error);
        return response.status(500).json({ message: error.message });
    }
};

const deleteVendor = (request, response) => {
    pool.query(queries.deleteVendor, [request.params.id], (error, results) => {
        if (error) {
            console.error("Error deleting vendor:", error);
            return response
                .status(500)
                .json({ error: "Failed to delete vendor" });
        }

        if (results.rowCount > 0) {
            response.status(200).json(`Vendor deleted with ID: ${id}`);
        } else {
            response.status(404).json(`Vendor not found with ID: ${id}`);
        }
    });
};

module.exports = {
    getVendors,
    getVendorById,
    createVendor,
    updateVendor,
    deleteVendor,
};
