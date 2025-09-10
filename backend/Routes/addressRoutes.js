const express = require("express");
const router = express.Router();
const { createAddress, getUserAddresses, updateAddress, selectAddress } = require("../Controllers/addressControllers");

router.post("/", createAddress);
router.get("/", getUserAddresses);
router.put("/update/:id", updateAddress);
router.post("/select", selectAddress);

module.exports = router;
