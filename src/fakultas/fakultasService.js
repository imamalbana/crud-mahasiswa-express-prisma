const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { paginate } = require("../shared/utils/paginate");
const repo = require("./fakultasRepository");

const getAllFakultas = async (params) => {
  return repo.getAll(params);
};

const getFakultasById = async (id) => {
  const fakultas = await repo.getById(id);
  if (!fakultas) {
    throw new Error(`Fakultas dengan id: ${id} tidak ditemukan`);
  }
  return fakultas;
};

const createFakultas = async (data) => {
  if (!data.nama || !data.nama.trim()) {
    throw new Error("Silahkan isi nama fakultas");
  }
  const fakultas = await repo.create(data);
  return fakultas;
};

const updateFakultas = async (id, data) => {
  if (!data.nama || !data.nama.trim()) {
    throw new Error("tidak ada data yang di update");
  }
  const findFakultas = await repo.getById(id);
  if (!findFakultas) {
    throw new Error(`Fakultas dengan id ${id} tidak di temukan`);
  }
  const fakultas = await repo.update(id, data);
  return fakultas;
};

const deleteFakultas = async (id) => {
  const findFakultas = await repo.getById(id);
  if (!findFakultas) {
    throw new Error(`Fakultas dengan id ${id} tidak di temukan`);
  }
  const relatedFakultas = await prisma.jurusan.count({
    where: { fakultasId: id },
  });
  if (relatedFakultas > 0) {
    throw new Error(`Fakultas dengan id ${id} dipakai di jurusan`);
  }

  const fakultas = await repo.deleteById(id);
  return fakultas;
};

module.exports = {
  getAllFakultas,
  getFakultasById,
  updateFakultas,
  createFakultas,
  deleteFakultas,
};
