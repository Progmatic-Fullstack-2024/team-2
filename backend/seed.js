import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create 5 theaters
  const theaters = await Promise.all([
    prisma.theater.create({
      data: {
        name: "Royal Theater",
        address: "123 Main St, Cityville",
        email: "contact@royaltheater.com",
        imageURL: "https://example.com/theater1.jpg",
        phone: "+1234567890",
        seats: 300,
      },
    }),
    prisma.theater.create({
      data: {
        name: "Grand Opera House",
        address: "456 Opera Ave, Music City",
        email: "info@grandopera.com",
        imageURL: "https://example.com/theater2.jpg",
        phone: "+1234567891",
        seats: 500,
      },
    }),
    prisma.theater.create({
      data: {
        name: "Shakespeare Arena",
        address: "789 Bard Ln, Theaterland",
        email: "contact@shakespearearena.com",
        imageURL: "https://example.com/theater3.jpg",
        phone: "+1234567892",
        seats: 200,
      },
    }),
    prisma.theater.create({
      data: {
        name: "Sunset Theater",
        address: "101 Sunset Blvd, Sun City",
        email: "info@sunsettheater.com",
        imageURL: "https://example.com/theater4.jpg",
        phone: "+1234567893",
        seats: 150,
      },
    }),
    prisma.theater.create({
      data: {
        name: "Downtown Playhouse",
        address: "202 City Center, Downtown",
        email: "contact@downtownplayhouse.com",
        imageURL: "https://example.com/theater5.jpg",
        phone: "+1234567894",
        seats: 250,
      },
    }),
  ]);

  // Create 5 creators
  const creators = await Promise.all([
    prisma.creator.create({
      data: {
        name: "John Doe",
        imageURL: "https://example.com/johndoe.jpg",
      },
    }),
    prisma.creator.create({
      data: {
        name: "Jane Smith",
        imageURL: "https://example.com/janesmith.jpg",
      },
    }),
    prisma.creator.create({
      data: {
        name: "Michael Johnson",
        imageURL: "https://example.com/michaeljohnson.jpg",
      },
    }),
    prisma.creator.create({
      data: {
        name: "Emily Davis",
        imageURL: "https://example.com/emilydavis.jpg",
      },
    }),
    prisma.creator.create({
      data: {
        name: "Sarah Brown",
        imageURL: "https://example.com/sarahbrown.jpg",
      },
    }),
  ]);

  // Create performances for each theater
  for (const theater of theaters) {
    const performances = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.performance.create({
          data: {
            title: `Amazing Show at ${theater.name}`,
            theater: { connect: { id: theater.id } },
            creators: {
              connect: creators.map((creator) => ({ id: creator.id })),
            },
            posterURL: "https://example.com/poster.jpg",
            imagesURL: [
              "https://example.com/image1.jpg",
              "https://example.com/image2.jpg",
              "https://example.com/image3.jpg",
            ],
            performanceDate: [
              new Date("2025-03-10T20:00:00Z"),
              new Date("2025-03-11T20:00:00Z"),
              new Date("2025-03-12T20:00:00Z"),
            ],
            description:
              "A stunning performance showcasing extraordinary talent.",
            price: 50,
          },
        }),
      ),
    );
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
