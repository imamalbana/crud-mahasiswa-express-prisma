const express = require("express");
const app = express();
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");

app.use(express.json());

// Mount route mahasiswa
app.use("/api/mahasiswa", mahasiswaRoutes);

module.exports = app;
