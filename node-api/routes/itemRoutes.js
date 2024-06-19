const express = require("express");
const router = express.Router();
const itemApi = require("../controller/itemController");

// get
router.get("/", itemApi.getItems);
router.get("/:id", itemApi.getItemById);

// post
router.post("/", itemApi.createItem);

// put
router.put("/:id", itemApi.updateItem);

// delete
router.delete("/:id", itemApi.deleteItem);

module.exports = router;
