const express = require("express");
const router = express.Router();
const jurusanController = require("../controllers/jurusanController");

router.get("/", jurusanController.getAllJurusan);

module.exports = router;
