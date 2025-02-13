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

  export default { getByUserId };