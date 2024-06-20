const express = require("express");
const router = express.Router();
const locationApi = require("../controller/locationController");

// get
router.get("/", locationApi.getLocations);
router.get("/:id", locationApi.getLocationById);

// post
router.post("/", locationApi.createLocation);

// put
router.put("/:id", locationApi.updateLocation);

// delete
router.delete("/:id", locationApi.deleteLocation);

module.exports = router;
