/** START OF GET ITEMS */

const items = `
	SELECT 
		items.id AS ID,
		items.name AS ITEM,
		items.quantity AS QUANTITY, 
		status.name AS STATUS, 
		locations.name AS LOCATION, 
		vendors.name AS VENDOR,
		items.active AS ACTIVE
	FROM items
	LEFT JOIN locations 
		ON items.location = locations.id
	LEFT JOIN status 
		ON items.status = status.id
	LEFT JOIN vendors 
		ON items.vendor = vendors.id;
`;

const itemById = `
	SELECT 
		items.id AS ID,
		items.name AS ITEM,
		items.quantity AS QUANTITY, 
		status.name AS STATUS, 
		locations.name AS LOCATION, 
		vendors.name AS VENDOR,
		items.active AS ACTIVE
	FROM items
	LEFT JOIN locations 
		ON items.location = locations.id
	LEFT JOIN status 
		ON items.status = status.id
	LEFT JOIN vendors 
		ON items.vendor = vendors.id
	WHERE items.id = $1;
`;

/** END OF GET ITEMS */

/** START OF CREATE ITEMS */
const createItem = `
	INSERT INTO items (location, status, vendor, name, quantity, active)
	VALUES ($1, $2, $3, $4, $5, $6)
	RETURNING id;
`;

/** END OF CREATE ITEMS */

/** START OF CREATE ITEMS */

const updateItem = `
	UPDATE items 
	SET name = COALESCE($1, name),
		quantity = COALESCE($2, quantity),
		status = COALESCE($3, status),
		vendor = COALESCE($4, vendor),
		location = COALESCE($5, location),
		active = COALESCE($6, active)
	WHERE id = $7
	RETURNING id;
`;

/** END OF CREATE ITEMS */

const deleteItem = `DELETE FROM items WHERE id = $1 RETURNING id;`;

module.exports = {
    items,
    itemById,
    createItem,
    updateItem,
    deleteItem,
};
