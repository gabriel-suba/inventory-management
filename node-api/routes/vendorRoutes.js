const express = require("express");
const router = express.Router();
const vendorApi = require("../controller/vendorController");

// get
router.get("/", vendorApi.getVendors);
router.get("/:id", vendorApi.getVendorById);

// post
router.post("/", vendorApi.createVendor);

// put
router.put("/:id", vendorApi.updateVendor);

// delete
router.delete("/:id", vendorApi.deleteVendor);

module.exports = router;
