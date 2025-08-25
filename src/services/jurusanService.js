const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllJurusan = async () => {
  const jurusan = await prisma.jurusan.findMany({
    include: {
      fakultas: true,
    },
  });
  return jurusan;
};

const getJurusanById = async (id) => {
  const jurusan = await prisma.jurusan.findUnique({
    where: { id },
    include: {
      fakultas: true,
    },
  });
  if (!jurusan) {
    throw new Error(`Jurusan dengan id = ${id} tidak ditemukan`);
  }
  return jurusan;
};

module.exports = {
  getAllJurusan,
  getJurusanById,
};
