const express = require("express");
const router = express.Router();
const fakultasController = require("../controllers/fakultasController");

router.get("/", fakultasController.getAllFakultas);
router.get("/:id", fakultasController.getFakultasById);

module.exports = router;
