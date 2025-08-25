const jurusanService = require("../services/jurusanService");

const getAllJurusan = async (req, res) => {
  try {
    const jurusan = await jurusanService.getAllJurusan();
    res.json({
      status: "success",
      message: "berhasil menampilkan semua jurusan",
      data: jurusan,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  getAllJurusan,
};
