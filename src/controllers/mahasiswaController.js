const mahasiswaService = require("../services/mahasiswaService");

// Function untuk menampilkan semua mahasiswa
const getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await mahasiswaService.getAllMahasiswa();
    res.json({
      status: "success",
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
  getAllMahasiswa, // eksport sebagai objek
};
