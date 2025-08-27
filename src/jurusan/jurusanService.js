const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jurusanRepo = require("./jurusanRepository");
const { findOrFail } = require("../shared/utils/helper");
const getAllJurusan = async (params) => {
  return jurusanRepo.getAll({
    ...params,
    include: {
      fakultas: true,
    },
  });
};

const getJurusanById = async (id) => {
  const jurusan = await jurusanRepo.getById(id, {
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
  const fakultas = await findOrFail(prisma.fakultas, fakultasId, "Fakultas");
  const existingJurusan = await prisma.jurusan.findUnique({
    where: { nama },
  });
  if (existingJurusan) {
    throw new Error(`Jurusan dengan nama "${nama}" sudah ada`);
  }

  const jurusan = await jurusanRepo.create(
    {
      nama,
      fakultas: { connect: { id: fakultasId } },
    },
    {
      include: {
        fakultas: true,
      },
    }
  );
  return jurusan;
};

const updateJurusan = async (id, { nama, fakultasId }) => {
  if (!nama && !fakultasId) {
    throw new Error("Tidak ada data yang bisa di update");
  }
  const findJurusan = await findOrFail(prisma.jurusan, id, "Jurusan");
  const findFakultas = await findOrFail(
    prisma.fakultas,
    fakultasId,
    "Fakultas"
  );

  const jurusan = await jurusanRepo.update(
    id,
    {
      ...(nama && { nama }),
      ...(fakultasId && {
        fakultas: {
          connect: {
            id: fakultasId,
          },
        },
      }),
    },
    {
      include: {
        fakultas: true,
      },
    }
  );
  return jurusan;
};

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
  updateJurusan,
};
