const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Helper random nama mahasiswa
function randomName() {
  const firstNames = [
    "Budi",
    "Siti",
    "Agus",
    "Rina",
    "Dewi",
    "Andi",
    "Rudi",
    "Ayu",
    "Hendra",
    "Tina",
  ];
  const lastNames = [
    "Santoso",
    "Aminah",
    "Wijaya",
    "Putra",
    "Pratama",
    "Sukarno",
    "Halim",
    "Lestari",
  ];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

// Helper random NIM
function randomNim(index) {
  return `M${index.toString().padStart(3, "0")}`; // M001, M002, dst
}

async function main() {
  // Bersihkan data lama + reset auto increment
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE mahasiswa`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE jurusan`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE fakultas`);
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1`);

  // Buat Fakultas
  await prisma.fakultas.createMany({
    data: [
      { nama: "Fakultas Teknik" },
      { nama: "Fakultas Ekonomi" },
      { nama: "Fakultas Kedokteran" },
    ],
  });

  const allFakultas = await prisma.fakultas.findMany();

  // Buat Jurusan
  const jurusanData = [
    { nama: "Teknik Informatika", fakultasId: allFakultas[0].id },
    { nama: "Sistem Informasi", fakultasId: allFakultas[0].id },
    { nama: "Manajemen", fakultasId: allFakultas[1].id },
    { nama: "Akuntansi", fakultasId: allFakultas[1].id },
    { nama: "Kedokteran Umum", fakultasId: allFakultas[2].id },
    { nama: "Kedokteran Gigi", fakultasId: allFakultas[2].id },
  ];

  await prisma.jurusan.createMany({ data: jurusanData });

  const allJurusan = await prisma.jurusan.findMany();

  // Buat 50 Mahasiswa random
  const mahasiswaData = [];
  for (let i = 1; i <= 50; i++) {
    const jurusan = allJurusan[Math.floor(Math.random() * allJurusan.length)];
    mahasiswaData.push({
      nama: randomName(),
      nim: randomNim(i),
      jurusanId: jurusan.id,
    });
  }

  await prisma.mahasiswa.createMany({ data: mahasiswaData });

  console.log("✅ Seeding 50 mahasiswa selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
