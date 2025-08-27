const fakultasService = require("../services/fakultasService");

const getAllFakultas = async (req, res) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const sortBy = req.query.sortBy;
    const order = req.query.order;

    const result = await fakultasService.getAllFakultas({
      page,
      limit,
      sortBy,
      order,
    });
    res.json({
      status: "success",
      message: "Berhasil menampilkan semua data fakultas",
      ...result,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
const getFakultasById = async (req, res) => {
  try {
    const { id } = req.params;
    const fakultas = await fakultasService.getFakultasById(Number(id));
    res.json({
      status: "success",
      message: `Data dengan id : ${id}`,
      data: fakultas,
    });
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message,
    });
  }
};
const createFakultas = async (req, res) => {
  try {
    const { nama } = req.body;
    const fakultas = await fakultasService.createFakultas({
      nama,
    });
    res.json({
      status: "success",
      message: "berhasil menambahkan data",
      data: fakultas,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
const updateFakultas = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;
    const fakultas = await fakultasService.updateFakultas(Number(id), {
      nama,
    });
    res.json({
      status: "success",
      message: "data updated succesfully",
      data: fakultas,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
const deleteFakultas = async (req, res) => {
  try {
    const { id } = req.params;
    const fakultas = await fakultasService.deleteFakultas(Number(id));
    res.json({
      status: "success",
      message: "data deleted succesfully",
      data: fakultas,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  getAllFakultas,
  getFakultasById,
  updateFakultas,
  createFakultas,
  updateFakultas,
  deleteFakultas,
};
