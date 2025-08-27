const express = require("express");
const router = express.Router();
const fakultasController = require("../controllers/fakultasController");

router.get("/", fakultasController.getAllFakultas);
router.get("/:id", fakultasController.getFakultasById);
router.post("/", fakultasController.createFakultas);
router.put("/:id", fakultasController.updateFakultas);

module.exports = router;
