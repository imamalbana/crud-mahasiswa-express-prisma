const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

getAllFakultas = async () => {
  const fakultas = await prisma.fakultas.findMany();
  return fakultas;
};
getFakultasById = async (id) => {
  const fakultas = await prisma.fakultas.findUnique({
    where: { id },
  });
  if (!fakultas) {
    throw new Error(`Fakultas dengan id ${id} tidak di temukan`);
  }
  return fakultas;
};
createFakultas = async () => {};
updateFakultas = async () => {};
deleteFakultas = async () => {};

module.exports = {
  getAllFakultas,
  getFakultasById,
  updateFakultas,
  createFakultas,
  updateFakultas,
  deleteFakultas,
};
