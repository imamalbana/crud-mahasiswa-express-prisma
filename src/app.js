const express = require("express");
const app = express();
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
const jurusanRoutes = require("./routes/jurusanRoutes");
const fakultasRoutes = require("./routes/fakultasRoutes");

app.use(express.json());

// Mount route mahasiswa
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/jurusan", jurusanRoutes);
app.use("/api/fakultas", fakultasRoutes);

module.exports = app;
