const mahasiswaService = require("../services/mahasiswaService");

// Function untuk menampilkan semua mahasiswa
const getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await mahasiswaService.getAllMahasiswa();
    res.json({
      status: "success",
      message: "Berhasil menampilkan data mahasiswa",
      data: mahasiswa,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const createMahasiswa = async (req, res) => {
  try {
    const { nama, nim, jurusanId } = req.body;
    const mahasiswa = await mahasiswaService.createMahasiswa({
      nama,
      nim,
      jurusanId,
    });
    res.json({
      status: "success",
      message: "Berhasil menambahkan data mahasiswa",
      data: mahasiswa,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  getAllMahasiswa,
  createMahasiswa, // eksport sebagai objek
};
