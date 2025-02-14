import prisma from "../models/prisma-client.js";

const getByUserId = async ({ userId }) => {
  const response = await prisma.userSeasonTicket.findMany({
    where: { userId: userId },
    include: {
      SeasonTicket: true,
      userVisitedPerformance: true,
    },
  });

  return response.map((ticket) => {
    const expirationDate = new Date(ticket.created);
    expirationDate.setDate(
      expirationDate.getDate() + ticket.SeasonTicket.durationDay
    );

    const usedSeats = ticket.userVisitedPerformance.reduce(
      (sum, visit) => sum + visit.seats,
      0
    );
    const remainingSeats = ticket.SeasonTicket.seatQuantity - usedSeats;

    return {
      ...ticket,
      expirationDate: expirationDate.toISOString(),
      remainingSeats: Math.max(remainingSeats, 0),
    };
  });
};

const getPerformanceEventSoldSeats = async ({ performanceEventId }) => {
  const userVisitedPerformances = await prisma.userVisitedPerformance.findMany({
    where: { performanceEventsId: performanceEventId },
  });

  const soldSeats = userVisitedPerformances.reduce(
    (sum, item) => sum + (item.seats || 0),
    0
  );
  return soldSeats;
};

const buyTicket = async ({
  performanceEventId,
  userId,
  userSeasonTicketId,
  seats,
}) => {
  const ticketsBought = await prisma.userVisitedPerformance.create({
    data: {
      seats,
      qrImage:"dfgb678dfghj9öfghj",
      userSeasonTicket: {
        connect: { id: userSeasonTicketId }, // Kapcsolódás a meglévő bérlethez
      },
      user: {
        connect: {id: userId}
      },
      performanceEvents: {
        connect: {id: performanceEventId}
      },
    },
  });
  return ticketsBought;
};

export default { getByUserId, getPerformanceEventSoldSeats, buyTicket };
