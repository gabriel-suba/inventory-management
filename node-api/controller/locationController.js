const pool = require("../database/dbconn");
const queries = require("../database/queries/locationQueries");

const getLocations = (request, response) => {
    pool.query(queries.locations, (error, results) => {
        if (error) {
            console.error("Error retrieving locations:", error);
            return response
                .status(500)
                .json({ error: "Failed to retrieve locations" });
        }

        response.status(200).json(results.rows);
    });
};

const getLocationById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(queries.locationById, [id], (error, results) => {
        if (error) {
            console.error("Error retrieving location:", error);
            return response
                .status(500)
                .json({ error: "Failed to retrieve location" });
        }

        response.status(200).json(results.rows);
    });
};

const createLocation = async (request, response) => {
    const { name, active } = request.body;

    try {
        if (!name) {
            return response
                .status(400)
                .json({ message: "Name Field is required." });
        }

        const newLocation = await pool.query(queries.createLocation, [
            name,
            active || true,
        ]);

        if (newLocation.rowCount > 0) {
            return response.status(200).json({
                message: `Location has been created: ${newLocation.rows[0].id}`,
            });
        }
    } catch (error) {
        console.error("Error creating location:", error);
        return response.status(500).json({ message: error.message });
    }
};

const updateLocation = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        const updatedLocation = await pool.query(queries.updateLocation, [
            request.body.name || null,
            request.body.active || null,
            id,
        ]);

        if (updatedLocation.rowCount > 0) {
            return response.status(200).json({
                message: `Location has been updated: ${updatedLocation.rows[0].id}`,
            });
        } else {
            return response
                .status(400)
                .json({ message: "Location update failed" });
        }
    } catch (error) {
        console.error("Error updating location:", error);
        return response.status(500).json({ message: error.message });
    }
};

const deleteLocation = (request, response) => {
    pool.query(
        queries.deleteLocation,
        [request.params.id],
        (error, results) => {
            if (error) {
                console.error("Error deleting location:", error);
                return response
                    .status(500)
                    .json({ error: "Failed to delete location" });
            }

            if (results.rowCount > 0) {
                response
                    .status(200)
                    .json(`Location deleted with ID: ${request.params.id}`);
            } else {
                response
                    .status(404)
                    .json(`Location not found with ID: ${request.params.id}`);
            }
        }
    );
};

module.exports = {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
};
