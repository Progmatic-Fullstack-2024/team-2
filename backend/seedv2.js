import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const genreList = [
    'tragédia',
    'komédia',
    'tragikomédia',
    'monodráma',
    'zenés',
    'kísérleti',
    'klasszikus',
  ];

  // Kulcsszavak a generáláshoz
  const theaterNames = ['Napfény Színház', 'Holdfény Színház', 'Csillagszóró Színház', 'Tavasz Színház', 'Éjfél Színház'];
  const creatorNames = ['Juhász Anna', 'Kovács Béla', 'Szabó Zoltán', 'Nagy Eszter', 'Molnár Péter', 'Tóth Ilona', 'Varga Tamás', 'Kiss László', 'Farkas Ágnes', 'Lukács Gábor', 'Balogh Réka', 'Sándor Mária', 'Horváth Attila', 'Hegedűs Júlia', 'Simon András', 'Gál Krisztina', 'Fekete Dániel', 'Mészáros Edit', 'Németh Márton', 'Tóth Nóra', 'Bodnár Levente', 'Barta Kata', 'Kerekes István', 'Vörös Veronika', 'Csikós Lili'];
  const performanceTitles = ['Csillagok Tánca', 'Éjféli Harmónia', 'Naplemente Szimfónia', 'Holdas Álmok', 'Tavaszi Reggel', 'Kísérleti Szenvedély', 'Komédiák Kertje', 'Tragédia a Fák Alatt', 'Monodráma az Éjben', 'Zenés Varázslat'];

  // Generate random users for theater admins and followers
  const users = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.user.create({
        data: {
          lastName: `UserLastName${i + 1}`,
          firstName: `UserFirstName${i + 1}`,
          email: `user${i + 1}@example.com`,
          phone: `+123456789${i}`,
          password: 'password123',
          role: i < 5 ? 'admin' : 'user', // First 5 users are admins
          birthDate: new Date(`1990-01-${(i % 31) + 1}`),
        },
      })
    )
  );

  // Create 5 unique theaters with pre-defined names
  const theaters = await Promise.all(
    theaterNames.map((name, i) =>
      prisma.theater.create({
        data: {
          name,
          address: `Unique Address ${i + 1}`,
          email: `theater${i + 1}@example.com`,
          imageURL: `/Theatron.jpg`,
          phone: `+123456789${i + 10}`,
          seatsAvailable: 200 + i * 50,
          admins: {
            create: {
              user: { connect: { id: users[i].id } }, // Assign one admin per theater
            },
          },
        },
      })
    )
  );

  // Create 25 unique creators with pre-defined names
  const creators = await Promise.all(
    creatorNames.map((name, i) =>
      prisma.creator.create({
        data: {
          name,
          imageURL: `/Creator.jpg`,
          profession: ['actor', 'director', 'writer', 'stageDesigner'], // Rotate professions
          awards: i % 2 === 0 ? `Award ${i + 1}` : null,
          introductions: `Introduction of ${name}`,
        },
      })
    )
  );

  // Create performances for each theater with pre-defined titles
  for (const [i, theater] of theaters.entries()) {
    for (let j = 0; j < 5; j++) {
      const randomGenre =
        genreList[Math.floor(Math.random() * genreList.length)]; // Pick a random genre from the list

      const performanceTitle =
        performanceTitles[(i * 5 + j) % performanceTitles.length];

      const performance = await prisma.performance.create({
        data: {
          title: performanceTitle,
          theater: { connect: { id: theater.id } },
          creators: {
            connect: creators
              .slice(j * 5, (j + 1) * 5) // Assign 5 creators per performance
              .map(creator => ({ id: creator.id })),
          },
          genre: {
            create: { name: randomGenre }, // Assign random genre
          },
          posterURL: `/theatron01.jpg`,
          imagesURL: [
            `/theatron02.jpg`,
          ],
          description: `Description for ${performanceTitle}`,
          targetAudience: ['adult', 'kid', 'teenager', 'every_age'][j % 4], // Rotate target audiences
        },
      });

      // Create performance events for the performance
      await prisma.performanceEvents.create({
        data: {
          performanceId: performance.id,
          performanceDate: [
            new Date(`2025-03-${10 + j}T20:00:00Z`),
            new Date(`2025-03-${11 + j}T20:00:00Z`),
          ],
          spots: 100 + j * 20,
          soldSpots: j * 10,
        },
      });

    //   // Create future performances for the performance
    //   await prisma.futurePerformances.create({
    //     data: {
    //       performanceId: performance.id,
    //       targetBudgetIdeal: 5000000,
    //       targetBudget: 4000000,
    //       minimumBudget: 2000000,
    //       actualBudget: 1000000 + j * 500000,
    //       gift: `Gift for ${performanceTitle}`,
    //     },
    //   });
    }
  }

  console.log('Seed data with unique names (from keywords) created successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
