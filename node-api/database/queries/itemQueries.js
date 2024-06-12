const items = `
	SELECT 
		items.id AS ID,
		items.name AS ITEM,
		items.quantity AS QUANTITY, 
		status.name AS STATUS, 
		locations.name AS LOCATION, 
		vendors.name AS VENDOR
	FROM items
	JOIN locations 
		ON items.location = locations.id
	JOIN status 
		ON items.status = status.id
	JOIN vendors 
		ON items.vendor = vendors.id;
`;

const itemById = `
	SELECT 
		items.id AS ID,
		items.name AS ITEM,
		items.quantity AS QUANTITY, 
		status.name AS STATUS, 
		locations.name AS LOCATION, 
		vendors.name AS VENDOR
	FROM items
	JOIN locations 
		ON items.location = locations.id
	JOIN status 
		ON items.status = status.id
	JOIN vendors 
		ON items.vendor = vendors.id
	WHERE items.id = $1;
`;

module.exports = {
    items,
    itemById,
};
