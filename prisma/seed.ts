import { PrismaPg } from "@prisma/adapter-pg";

import config from "../prisma.config";
import { PrismaClient, type Ticket } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: config.datasource?.url,
});

const prisma = new PrismaClient({ adapter });

const tickets: Partial<Ticket>[] = [
  // Partial because id and timestamps are auto-generated
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "CLOSED",
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database",
    status: "OPEN",
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database",
    status: "OPEN",
  },
  {
    title: "Ticket 4",
    content: "This is the fourth ticket from the database",
    status: "CLOSED",
  },
  {
    title: "Ticket 5",
    content: "This is the fifth ticket from the database",
    status: "IN_PROGRESS",
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("Seeding database...");

  await prisma.ticket.deleteMany({}); // Clear existing data
  await prisma.ticket.createMany({
    data: tickets as Ticket[], // can't be partial anymore
  });

  const t1 = performance.now();
  console.log(`Seeding completed. ( ${t1 - t0} ms )`);
};

seed();
