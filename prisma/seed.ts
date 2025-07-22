// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to get a date by subtracting hours from the current time
const subHours = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date;
};

async function main() {
  console.log("Start seeding with new professional data...");
  // Clear previous data
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();
  console.log("Cleared old data.");

  // Create cameras with unique live feed URLs
  const camera1 = await prisma.camera.create({
    data: {
      name: "Shop Floor",
      location: "Main Retail Area",
      liveFeedUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-a-man-walking-on-a_sandy-beach-41505-large.mp4",
    },
  });
  const camera2 = await prisma.camera.create({
    data: {
      name: "Vault Door",
      location: "Underground Vault",
      liveFeedUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-surveillance-camera-on-a-wall-41640-large.mp4",
    },
  });
  const camera3 = await prisma.camera.create({
    data: {
      name: "Main Entrance",
      location: "Front of Building",
      liveFeedUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-security-camera-of-a-courtyard-41641-large.mp4",
    },
  });
  console.log("Created cameras with live feeds.");

  // A diverse and well-distributed set of incidents over 24 hours
  const incidentsData = [
    // --- RECENT & UNRESOLVED (Last 4 hours) ---
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
      tsStart: subHours(1.5),
      tsEnd: subHours(1.49),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2d2cWp6a2ZqN2w1a2F0d2g4c2w5b3c5eDQ0eXh6eXJ6eXg2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j5bsZ0k4i4iJ2/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Face Recognised",
      tsStart: subHours(3),
      tsEnd: subHours(2.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF_naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: false,
    },

    // --- MID-DAY & UNRESOLVED (4-12 hours ago) ---
    {
      cameraId: camera3.id,
      type: "Traffic Congestion",
      tsStart: subHours(6),
      tsEnd: subHours(5.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2ZqN3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btO4KkAs2e3f5q8/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera1.id,
      type: "Face Recognised",
      tsStart: subHours(8),
      tsEnd: subHours(7.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW11Z3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF_naWZfYnlfaWQmY3Q9Zw/11gZB5BqjYq7a8/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera2.id,
      type: "Unauthorised Access",
      tsStart: subHours(11),
      tsEnd: subHours(10.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3o3d3g1d2g3d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1g0ODwY6t2H84/giphy.gif",
      resolved: false,
    },

    // --- OLDER & UNRESOLVED (12-20 hours ago) ---
    {
      cameraId: camera1.id,
      type: "Unauthorised Access",
      tsStart: subHours(14),
      tsEnd: subHours(13.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2d2cWp6a2ZqN2w1a2F0d2g4c2w5b3c5eDQ0eXh6eXJ6eXg2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j5bsZ0k4i4iJ2/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Gun Threat",
      tsStart: subHours(18),
      tsEnd: subHours(17.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW81c2l4c3g2d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPoZniJ2hq8IItG/giphy.gif",
      resolved: false,
    },

    // --- OLD & RESOLVED (20+ hours ago) ---
    {
      cameraId: camera2.id,
      type: "Face Recognised",
      tsStart: subHours(22),
      tsEnd: subHours(21.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW81c2l4c3g2d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPoZniJ2hq8IItG/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera1.id,
      type: "Unauthorised Access",
      tsStart: subHours(26),
      tsEnd: subHours(25.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW81c2l4c3g2d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPoZniJ2hq8IItG/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera3.id,
      type: "Traffic Congestion",
      tsStart: subHours(30),
      tsEnd: subHours(29.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW81c2l4c3g2d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPoZniJ2hq8IItG/giphy.gif",
      resolved: false,
    },
    {
      cameraId: camera1.id,
      type: "Traffic Congestion",
      tsStart: subHours(30),
      tsEnd: subHours(29.99),
      thumbnailUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW81c2l4c3g2d3g1d2g3d3g1d2g3d3g1d2g3d3g1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPoZniJ2hq8IItG/giphy.gif",
      resolved: false,
    },
  ];

  for (const data of incidentsData) {
    await prisma.incident.create({ data });
  }
  console.log(
    `Seeding finished. Created ${incidentsData.length} diverse incidents.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
