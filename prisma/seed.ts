import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const subHours = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date;
};

async function main() {
  console.log("Start seeding...");
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();
  console.log("Cleared previous data.");

  const camera1 = await prisma.camera.create({
    data: { name: "Camera 01", location: "Shop Floor A" },
  });
  const camera2 = await prisma.camera.create({
    data: { name: "Camera 02", location: "Vault Door" },
  });
  const camera3 = await prisma.camera.create({
    data: { name: "Camera 03", location: "Main Entrance" },
  });
  console.log(
    `Created cameras: ${camera1.name}, ${camera2.name}, ${camera3.name}`
  );

  const incidentsToCreate = [
    {
      camera: camera1,
      type: "Unauthorised Access",
      tsStart: subHours(1),
      tsEnd: subHours(0.99),
      thumbnailUrl:
        "https://placehold.co/600x400/fb923c/ffffff?text=Access+Alert",
      resolved: false,
    },
    {
      camera: camera2,
      type: "Gun Threat",
      tsStart: subHours(0.5),
      tsEnd: subHours(0.49),
      thumbnailUrl:
        "https://placehold.co/600x400/dc2626/ffffff?text=URGENT:+Gun+Threat",
      resolved: false,
    },
    {
      camera: camera3,
      type: "Face Recognised",
      tsStart: subHours(2),
      tsEnd: subHours(1.99),
      thumbnailUrl:
        "https://placehold.co/600x400/3b82f6/ffffff?text=VIP+Recognised",
      resolved: false,
    },
    {
      camera: camera1,
      type: "Unauthorised Access",
      tsStart: subHours(2.5),
      tsEnd: subHours(2.49),
      thumbnailUrl:
        "https://placehold.co/600x400/fb923c/ffffff?text=Access+Alert",
      resolved: false,
    },
    {
      camera: camera3,
      type: "Unauthorised Access",
      tsStart: subHours(10),
      tsEnd: subHours(9.99),
      thumbnailUrl:
        "https://placehold.co/600x400/fb923c/ffffff?text=Access+Alert",
      resolved: false,
    },
    {
      camera: camera1,
      type: "Face Recognised",
      tsStart: subHours(15),
      tsEnd: subHours(14.99),
      thumbnailUrl:
        "https://placehold.co/600x400/3b82f6/ffffff?text=Watchlist+Match",
      resolved: false,
    },
    {
      camera: camera2,
      type: "Unauthorised Access",
      tsStart: subHours(18),
      tsEnd: subHours(17.99),
      thumbnailUrl:
        "https://placehold.co/600x400/fb923c/ffffff?text=Late+Access+Alert",
      resolved: false,
    },
    {
      camera: camera2,
      type: "Gun Threat",
      tsStart: subHours(20),
      tsEnd: subHours(19.99),
      thumbnailUrl:
        "https://placehold.co/600x400/dc2626/ffffff?text=Gun+Threat+2",
      resolved: false,
    },
    {
      camera: camera1,
      type: "Face Recognised",
      tsStart: subHours(22),
      tsEnd: subHours(21.99),
      thumbnailUrl:
        "https://placehold.co/600x400/3b82f6/ffffff?text=Known+Face",
      resolved: false,
    },
    {
      camera: camera3,
      type: "Unauthorised Access",
      tsStart: subHours(24),
      tsEnd: subHours(23.99),
      thumbnailUrl:
        "https://placehold.co/600x400/fb923c/ffffff?text=Old+Access+Alert",
      resolved: false,
    },
    {
      camera: camera2,
      type: "Face Recognised",
      tsStart: subHours(5),
      tsEnd: subHours(4.99),
      thumbnailUrl:
        "https://placehold.co/600x400/3b82f6/ffffff?text=Visitor+Match",
      resolved: true,
    },
    {
      camera: camera1,
      type: "Gun Threat",
      tsStart: subHours(8),
      tsEnd: subHours(7.99),
      thumbnailUrl:
        "https://placehold.co/600x400/dc2626/ffffff?text=Resolved+Gun",
      resolved: true,
    },
  ];

  for (const { camera, ...incidentData } of incidentsToCreate) {
    await prisma.incident.create({
      data: { ...incidentData, cameraId: camera.id },
    });
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
