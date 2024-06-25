const roles = `SELECT * FROM roles;`;

const roleById = `SELECT * FROM roles WHERE id = $1`;

module.exports = {
  roles,
  roleById,
};
