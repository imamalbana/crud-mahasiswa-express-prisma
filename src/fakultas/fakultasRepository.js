const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { paginate } = require("../utils/paginate");

const getAll = async (params) => paginate(prisma.fakultas, params);

const getById = async (id) =>
  prisma.fakultas.findUnique({
    where: { id },
  });

const create = async (data) =>
  prisma.fakultas.create({
    data,
  });

const update = async (id, data) =>
  prisma.fakultas.update({
    where: { id },
    data,
  });

const deleteById = async (id) => prisma.fakultas.delete({ where: { id } });

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
