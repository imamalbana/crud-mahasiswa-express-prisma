const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllJurusan = async () => {
  const jurusan = await Prisma.jurusan.findMany({
    include: {
      fakultas: true,
    },
  });
  return jurusan;
};

module.exports = {
  getAllJurusan,
};
