const express = require("express");
const router = express.Router();
const jurusanController = require("../controllers/jurusanController");

router.get("/", jurusanController.getAllJurusan);
router.get("/:id", jurusanController.getJurusanById);

module.exports = router;
