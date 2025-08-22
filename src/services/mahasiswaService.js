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

const updateMahasiswa = async (id, { nama, nim, jurusanId }) => {
  if (!nama || !nim || !jurusanId) {
    throw new Error("Nama, NIM, dan Jurusan tidak boleh kosong");
  }
  const user = await prisma.mahasiswa.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("Mahasiswa tidak di temukan");
  }

  const mahasiswa = await prisma.mahasiswa.update({
    where: { id },
    data: {
      ...(nim && { nim }),
      ...(nama && { nama }),
      ...(jurusanId && {
        jurusan: {
          connect: {
            id: jurusanId,
          },
        },
      }),
    },
    include: {
      jurusan: {
        include: {
          fakultas: true,
        },
      },
    },
  });
  return mahasiswa;
};

module.exports = {
  getAllMahasiswa,
  createMahasiswa,
  updateMahasiswa,
};
