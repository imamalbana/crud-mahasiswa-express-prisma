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

const updateMahasiswa = async (req, res) => {
  try {
    const { nama, nim, jurusanId } = req.body;
    const { id } = req.params;
    const mahasiswa = await mahasiswaService.updateMahasiswa(Number(id), {
      nama,
      nim,
      jurusanId,
    });
    res.json({
      status: "success",
      message: "Update mahasiswa berhasil",
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
  createMahasiswa,
  updateMahasiswa, // eksport sebagai objek
};
