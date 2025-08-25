const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllMahasiswa = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.mahasiswa.findMany({
      skip,
      take: limit,
      include: {
        jurusan: {
          include: {
            fakultas: true,
          },
        },
      },
      orderBy: {
        id: "asc", // biasanya data terbaru di atas
      },
    }),
    prisma.mahasiswa.count(),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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
