const express = require("express");
const router = express.Router();
const itemApi = require("../controller/itemController");

// get
router.get("/", itemApi.getItems);
router.get("/:id", itemApi.getItemById);

module.exports = router;
