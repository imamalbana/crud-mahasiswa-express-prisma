const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { paginate } = require("../utils/paginate");

const getAllFakultas = async (params) => {
  return paginate(prisma.fakultas, params);
};

const getFakultasById = async (id) => {
  const fakultas = await prisma.fakultas.findUnique({
    where: { id },
  });
  if (!fakultas) {
    throw new Error(`Fakultas dengan id ${id} tidak di temukan`);
  }
  return fakultas;
};
const createFakultas = async (data) => {
  if (!data.nama) {
    throw new Error("Silahkan isi nama fakultas");
  }
  const fakultas = await prisma.fakultas.create({
    data,
  });
  return fakultas;
};
const updateFakultas = async (id, data) => {
  if (!data.nama) {
    throw new Error("tidak ada data yang di update");
  }
  const findFakultas = await prisma.fakultas.findUnique({
    where: { id },
  });
  if (!findFakultas) {
    throw new Error(`Fakultas dengan id ${id} tidak di temukan`);
  }

  const fakultas = await prisma.fakultas.update({
    where: { id },
    data,
  });
  return fakultas;
};
const deleteFakultas = async () => {};

module.exports = {
  getAllFakultas,
  getFakultasById,
  updateFakultas,
  createFakultas,
  updateFakultas,
  deleteFakultas,
};
