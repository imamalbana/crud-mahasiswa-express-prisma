const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllMahasiswa = async () => {
  return await prisma.mahasiswa.findMany({
    include: {
      jurusan: {
        include: {
          fakultas: true,
        },
      },
    },
  });
};

const createMahasiswa = async ({ nama, nim, jurusanId }) => {
  const jurusan = await prisma.jurusan.findUnique({
    where: {
      id: jurusanId,
    },
  });
  if (!jurusan) {
    throw new Error("Jurusan tidak di temukan");
  }

  const mahasiswa = await prisma.mahasiswa.create({
    data: {
      nim,
      nama,
      jurusan: {
        connect: {
          id: jurusanId,
        },
      },
    },
    include: {
      jurusan: true,
    },
  });
  return mahasiswa;
};

module.exports = {
  getAllMahasiswa,
  createMahasiswa,
};
