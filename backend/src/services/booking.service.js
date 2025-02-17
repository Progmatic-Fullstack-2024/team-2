import QRCode from "qrcode";

import UserService from "./user.service.js";
import prisma from "../models/prisma-client.js";
import sendMail from "../utils/Mailing.service.js";

const getByUserId = async ({ userId }) => {
  const response = await prisma.userSeasonTicket.findMany({
    where: { userId },
    include: {
      SeasonTicket: true,
      UserVisitedPerformance: true,
    },
  });

  return response.map((ticket) => {
    const expirationDate = new Date(ticket.created);
    expirationDate.setDate(
      expirationDate.getDate() + ticket.SeasonTicket.durationDay,
    );

    const usedSeats = ticket.UserVisitedPerformance.reduce(
      (sum, visit) => sum + visit.seats,
      0,
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
    0,
  );
  return soldSeats;
};

const buyTicket = async ({
  performanceEventId,
  userId,
  userSeasonTicketId,
  seats,
}) => {
  const qrData = `${userId}-${performanceEventId}-${Date.now()}`;
  const qrImage = await QRCode.toDataURL(qrData);
  const ticketsBought = await prisma.userVisitedPerformance.create({
    data: {
      seats,
      qrImage,
      userSeasonTicket: {
        connect: { id: userSeasonTicketId }, // Kapcsolódás a meglévő bérlethez
      },
      user: {
        connect: { id: userId },
      },
      performanceEvents: {
        connect: { id: performanceEventId },
      },
    },
  });
  return ticketsBought;
};

const sendQrCodeMail = async (userId, theater, title, date, time, qrImage) => {
  let result;
  const user = await UserService.getUserById(userId);
  const subject = "Helyfoglalás színházi előadásra";
  const text = `Kedves ${user.lastName} ${user.firstName}!<br/><br/>
  Az Ön helyfoglásának QR kódja
  <ul>
  <li>
    a(z) ${theater} színház <br/>
  </li>
  <li>
   ${title} című előadására a következő:
  </li>
  </ul>
  <img src=${qrImage} alt="qr kód"/> <br/>
  <br/>
  Az előadás időpontja: ${date} ${time}<br/>
  <br/>
  Üdvözlettel<br/>
  Theatron csapata`;
  const answer = await sendMail(user.email, subject, text, true);
  if (answer.accepted) result = "OK";
  else result = "fail";
  return result;
};

export default {
  getByUserId,
  getPerformanceEventSoldSeats,
  buyTicket,
  sendQrCodeMail,
};
