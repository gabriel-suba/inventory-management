const vendors = `SELECT * FROM vendors;`;

const vendorById = `SELECT * FROM vendors WHERE id = $1`;

const createVendor = `
	INSERT INTO vendors (name, email, phone, active)
	VALUES ($1, $2, $3, $4)
	RETURNING id;
`;

const updateVendor = `
	UPDATE vendors
	SET name = COALESCE($1, name),
		email = COALESCE($2, email),
		phone = COALESCE($3, phone),
		active = COALESCE($4, active)
	WHERE id = $5
	RETURNING id;
`;

const deleteVendor = `DELETE FROM vendors WHERE id = $1`;

module.exports = {
    vendors,
    vendorById,
    createVendor,
    updateVendor,
    deleteVendor,
};
