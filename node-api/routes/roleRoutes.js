const express = require("express");
const router = express.Router();
const roleApi = require("../controller/roleController");

// get
router.get("/", roleApi.getRoles);
router.get("/:id", roleApi.getRoleById);

module.exports = router;
