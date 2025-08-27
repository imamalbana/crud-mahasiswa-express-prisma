const express = require("express");
const router = express.Router();
const jurusanController = require("./jurusanController");

router.get("/", jurusanController.getAllJurusan);
router.get("/:id", jurusanController.getJurusanById);
router.post("/", jurusanController.createJurusan);
router.delete("/:id", jurusanController.deleteJurusan);
router.put("/:id", jurusanController.updateJurusan);

module.exports = router;
