const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllMahasiswa = async () => {
  return await prisma.mahasiswa.findMany(); // tanpa relasi
};

module.exports = {
  getAllMahasiswa,
};
