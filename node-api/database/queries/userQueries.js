const users = `
	SELECT 
		users.id AS ID,
		users.name AS NAME,
		users.email AS EMAIL,
		roles.name AS ROLE,
		locations.name AS LOCATION
	FROM users
	JOIN roles 
		ON users.role = roles.id
	JOIN locations 
		ON users.location = locations.id;
`;

const userById = `
	SELECT 
		users.id AS ID,
		users.name AS NAME,
		users.email AS EMAIL,
		roles.name AS ROLE,
		locations.name AS LOCATION,
		users.active AS ACTIVE
	FROM users
	JOIN roles 
		ON users.role = roles.id
	JOIN locations 
		ON users.location = locations.id
	WHERE users.id = $1;
`;

const userByIdRaw = `
	SELECT 
		users.id AS ID,
		users.name AS NAME,
		users.email AS EMAIL,
		users.role AS ROLE,
		users.location AS LOCATION,
		users.active AS ACTIVE
	FROM users
	WHERE users.id = $1;
`;

const userByEmail = `
	SELECT 
		users.id AS ID,
		users.name AS NAME,
		users.email AS EMAIL,
		roles.name AS ROLE,
		locations.name AS LOCATION,
		users.password AS PASSWORD
	FROM users
	JOIN roles 
		ON users.role = roles.id
	JOIN locations 
		ON users.location = locations.id
	WHERE users.email = $1;
`;

const createUser = `
	INSERT INTO users (role, location, name, email, password)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING id;
`;

const resetPassword = `
	UPDATE users SET password = $1 WHERE email = $2 RETURNING id;
`;

const updateUser = `
	UPDATE users 
	SET name = $1,
		email = $2,
		role = $3,
		location = $4,
		active = $5,
		password = COALESCE($6, password)
	WHERE id = $7
	RETURNING id;
`;

module.exports = {
    users,
    userById,
    userByEmail,
    createUser,
    resetPassword,
    userByIdRaw,
    updateUser,
};
