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

const createJurusan = async ({ nama, fakultasId }) => {
  const fakultas = await prisma.fakultas.findUnique({
    where: {
      id: fakultasId,
    },
  });
  if (!fakultas) {
    throw new Error("Fakultas tidak di temukan");
  }
  const jurusan = await prisma.jurusan.create({
    data: {
      nama,
      fakultas: {
        connect: {
          id: fakultasId,
        },
      },
    },
    include: {
      fakultas: true,
    },
  });
  return jurusan;
};

const updateJurusan = async () => {};

const deleteJurusan = async (id) => {
  const findJurusan = await prisma.jurusan.findUnique({
    where: { id },
    include: {
      mahasiswa: true,
    },
  });
  if (!findJurusan) {
    throw new Error(`Jurusan dengan id : ${id} tidak di temukan`);
  }
  if (findJurusan.mahasiswa.length > 0) {
    throw new Error(
      `Jurusan dengan id : ${id} tidak bisa dihapus karena masih dipakai mahasiswa`
    );
  }

  const jurusan = await prisma.jurusan.delete({
    where: { id },
  });
  return jurusan;
};

module.exports = {
  getAllJurusan,
  getJurusanById,
  createJurusan,
  deleteJurusan,
};
