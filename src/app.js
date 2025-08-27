const express = require("express");
const app = express();
const mahasiswaRoutes = require("./mahasiswa/mahasiswaRoutes");
const jurusanRoutes = require("./jurusan/jurusanRoutes");
const fakultasRoutes = require("./fakultas/fakultasRoutes");

app.use(express.json());

app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/jurusan", jurusanRoutes);
app.use("/api/fakultas", fakultasRoutes);

module.exports = app;
