const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { paginate } = require("../shared/utils/paginate");

const getAllMahasiswa = async (params) => {
  return paginate(prisma.mahasiswa, {
    ...params,
    include: {
      jurusan: {
        include: {
          fakultas: true,
        },
      },
    },
  });
};

const getMahasiswaById = async (id) => {
  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: { id },
    include: {
      // bukan 'data'
      jurusan: {
        include: {
          fakultas: true,
        },
      },
    },
  });

  if (!mahasiswa) {
    throw new Error(`Mahasiswa dengan ID = ${id} tidak di temukan`);
  }

  return mahasiswa;
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
  if (!nama && !nim && !jurusanId) {
    throw new Error("Tidak ada data untuk diupdate");
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

const deleteMahasiswa = async (id) => {
  const user = await prisma.mahasiswa.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error(`Mahasiswa dengan ID = ${id} tidak di temukan`);
  }
  const mahasiswa = await prisma.mahasiswa.delete({
    where: { id },
  });
};

module.exports = {
  getAllMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  getMahasiswaById,
};
