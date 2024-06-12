const express = require("express");
const router = express.Router();
const userApi = require("../controller/userController");

router.get("/", userApi.getUsers);
router.get("/:id", userApi.getUserById);

router.post("/", userApi.signUpUser);

router.put("/:id", userApi.updateUser);

router.delete("/:id", userApi.deleteUser);

router.post("/login", userApi.signInUser);
router.post("/login/check", userApi.verifyAuth);

module.exports = router;
