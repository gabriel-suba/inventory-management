const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = 3000;
const db = require("./database/queryHandlers");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, PostgreSQL" });
});

// TODO:: CREATE A FRONTEND FIRST
// CRUD:: USERS, VENDORS, ITEMS, LOCATIONS
// ALL DB:: USERS, VENDORS, ITEMS, LOCATIONS, ROLES, STATUS

// get all items
app.get("/items", db.getItems);

// get an item
app.get("/items/:id", db.getItemById);

// get get all users
app.get("/users", db.getUsers);

// get a user
app.get("/users/:id", db.getUserById);

// POST /users
// app.post("/users", db.addUser);

// PUT /users/1
// app.put("/users/:id", db.updateUser);

// DELETE /users/1
// app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
