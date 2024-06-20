const locations = `SELECT * FROM locations;`;

const locationById = `SELECT * FROM locations WHERE id = $1`;

const createLocation = `
	INSERT INTO locations (name, active)
	VALUES ($1, $2)
	RETURNING id;
`;

const updateLocation = `
	UPDATE locations
	SET name = COALESCE($1, name),
	    active = COALESCE($2, active)
	WHERE id = $3
	RETURNING id;
`;

const deleteLocation = `DELETE FROM locations WHERE id = $1 RETURNING id;`;

module.exports = {
    locations,
    locationById,
    createLocation,
    updateLocation,
    deleteLocation,
};
