const mahasiswaService = require("../services/mahasiswaService");

// Function untuk menampilkan semua mahasiswa
const getAllMahasiswa = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await mahasiswaService.getAllMahasiswa(page, limit);

    res.json({
      status: "success",
      message: "Berhasil menampilkan data mahasiswa",
      ...result, // data + meta
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

const deleteMahasiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswa = await mahasiswaService.deleteMahasiswa(Number(id));
    res.json({
      status: "success",
      message: "Data Berhasil di hapus",
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
  updateMahasiswa,
  deleteMahasiswa, // eksport sebagai objek
};
