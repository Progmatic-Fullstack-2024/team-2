import bookingService from "../services/booking.service.js";

const getByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const response = await bookingService.getByUserId({ userId });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getPerformanceEventSoldSeats = async (req, res, next) => {
  const { performanceEventId } = req.params;
  try {
    const response = await bookingService.getPerformanceEventSoldSeats({
      performanceEventId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const buyTicket = async (req, res, next) => {
  const { performanceEventId, userId, userSeasonTicketId, seats } = req.body;
  try {
    const response = await bookingService.buyTicket({
      performanceEventId,
      userId,
      userSeasonTicketId,
      seats,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export default { getByUserId, getPerformanceEventSoldSeats, buyTicket };
