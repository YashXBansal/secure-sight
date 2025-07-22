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

  const incidentsData = [
    {
      cameraId: camera2.id,
      type: "Gun Threat",
      tsStart: subHours(0.5),
      tsEnd: subHours(0.49),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW81c2l4c3g2d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPoZniJ2hq8IItG/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera1.id,
      type: "Unauthorised Access",
      tsStart: subHours(1),
      tsEnd: subHours(0.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2d2cWp6a2ZqN2w1a2F0d2g4c2w5b3c5eDQ0eXh6eXJ6eXg2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j5bsZ0k4i4iJ2/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Face Recognised",
      tsStart: subHours(2),
      tsEnd: subHours(1.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera1.id,
      type: "Unauthorised Access",
      tsStart: subHours(2.5),
      tsEnd: subHours(2.49),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3o3d3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1g0ODwY6t2H84/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Unauthorised Access",
      tsStart: subHours(10),
      tsEnd: subHours(9.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2d2cWp6a2ZqN2w1a2F0d2g4c2w5b3c5eDQ0eXh6eXJ6eXg2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j5bsZ0k4i4iJ2/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera1.id,
      type: "Face Recognised",
      tsStart: subHours(15),
      tsEnd: subHours(14.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera2.id,
      type: "Unauthorised Access",
      tsStart: subHours(48),
      tsEnd: subHours(47.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: true,
    },
    {
      cameraId: camera3.id,
      type: "Face Recognised",
      tsStart: subHours(72),
      tsEnd: subHours(71.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: true,
    },
    {
      cameraId: camera3.id,
      type: "Face Recognised",
      tsStart: subHours(72),
      tsEnd: subHours(71.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Face Recognised",
      tsStart: subHours(72),
      tsEnd: subHours(71.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Face Recognised",
      tsStart: subHours(72),
      tsEnd: subHours(71.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Face Recognised",
      tsStart: subHours(72),
      tsEnd: subHours(71.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Face Recognised",
      tsStart: subHours(72),
      tsEnd: subHours(71.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Face Recognised",
      tsStart: subHours(72),
      tsEnd: subHours(71.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: true,
    },
  ];

  for (const data of incidentsData) {
    await prisma.incident.create({ data });
  }
  console.log(`Seeding finished. Created ${incidentsData.length} incidents.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
