const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const genericRepo = require("../shared/genericRepository");

const jurusanRepo = genericRepo(prisma.jurusan);
module.exports = jurusanRepo;
