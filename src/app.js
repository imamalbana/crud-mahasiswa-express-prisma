const express = require("express");
const app = express();
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
const jurusanRoutes = require("./routes/jurusanRoutes");

app.use(express.json());

// Mount route mahasiswa
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/jurusan", jurusanRoutes);

module.exports = app;
