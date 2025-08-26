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

const getJurusanById = async (req, res) => {
  try {
    const { id } = req.params;
    const jurusan = await jurusanService.getJurusanById(Number(id));
    res.json({
      status: "success",
      message: `Berhasil menampilkan jurusan dengan id = ${id}`,
      data: jurusan,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

const createJurusan = async (req, res) => {
  try {
    const { nama, fakultasId } = req.body;
    const jurusan = await jurusanService.createJurusan({
      nama,
      fakultasId,
    });
    res.json({
      status: "success",
      message: "Berhasil menambahkan data jurusan",
      data: jurusan,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateJurusan = async (req, res) => {
  try {
    const { nama, fakultasId } = req.body;
    const { id } = req.params;
    const jurusan = await jurusanService.updateJurusan(Number(id), {
      nama,
      fakultasId,
    });
    res.json({
      status: "success",
      message: "data updated succesfully",
      data: jurusan,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const jurusan = await jurusanService.deleteJurusan(Number(id));
    res.json({
      status: "success",
      message: "Jurusan berhasil di hapus",
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
  getJurusanById,
  createJurusan,
  deleteJurusan,
  updateJurusan,
};
