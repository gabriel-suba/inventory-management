const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const locationRoutes = require("./routes/locationRoutes");
const roleRoutes = require("./routes/roleRoutes");

var cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// TODO: REDIRECT OR CREATE HOME PAGE
// app.get("/", (request, response) => {
//     response.json({ info: "Node.js, Express, PostgreSQL" });
// });

app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/vendors", vendorRoutes);
app.use("/locations", locationRoutes);
app.use("/roles", roleRoutes);

// TODO:: CREATE A FRONTEND FIRST, DELETE/INACTIVATE USER - alter table to include inactive -> update * users inactive = false
// CRUD:: USERS, VENDORS, ITEMS, LOCATIONS
// ALL DB:: USERS, VENDORS, ITEMS, LOCATIONS, ROLES, STATUS

// DELETE /users/1
// app.delete("/users/:id", db.deleteUser);

app.listen(process.env.APP_PORT, () => {
  console.log(`App is listening on port ${process.env.APP_PORT}`);
});
