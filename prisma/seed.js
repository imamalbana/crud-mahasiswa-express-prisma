const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // Fakultas
  const fakultasTeknik = await prisma.fakultas.upsert({
    where: { nama: "Teknik" },
    update: {},
    create: { nama: "Teknik" },
  });

  const fakultasEkonomi = await prisma.fakultas.upsert({
    where: { nama: "Ekonomi" },
    update: {},
    create: { nama: "Ekonomi" },
  });

  // Jurusan
  const jurusanInformatika = await prisma.jurusan.upsert({
    where: { nama: "Informatika" },
    update: {},
    create: { nama: "Informatika", fakultasId: fakultasTeknik.id },
  });

  const jurusanAkuntansi = await prisma.jurusan.upsert({
    where: { nama: "Akuntansi" },
    update: {},
    create: { nama: "Akuntansi", fakultasId: fakultasEkonomi.id },
  });

  // Mahasiswa
  await prisma.mahasiswa.upsert({
    where: { nim: "M001" },
    update: {},
    create: {
      nama: "Budi Santoso",
      nim: "M001",
      jurusanId: jurusanInformatika.id,
    },
  });

  await prisma.mahasiswa.upsert({
    where: { nim: "M002" },
    update: {},
    create: {
      nama: "Siti Aminah",
      nim: "M002",
      jurusanId: jurusanAkuntansi.id,
    },
  });

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
