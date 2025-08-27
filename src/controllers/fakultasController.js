const fakultasService = require("../services/fakultasService");

const getAllFakultas = async (req, res) => {
  try {
    const fakultas = await fakultasService.getAllFakultas();
    res.json({
      status: "success",
      message: "Berhasil menampilkan semua data fakultas",
      data: fakultas,
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
  } catch (err) {}
};
const updateFakultas = async (req, res) => {
  try {
  } catch (err) {}
};
const deleteFakultas = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  getAllFakultas,
  getFakultasById,
  updateFakultas,
  createFakultas,
  updateFakultas,
  deleteFakultas,
};
