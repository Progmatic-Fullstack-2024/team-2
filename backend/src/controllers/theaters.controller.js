import theatersService from "../services/theaters.service.js";

const getTheaterForDropdown = async (req, res, next) => {
  try {
    const theatersData = await theatersService.getTheaterIdName();
    return res.json(theatersData);
  } catch (error) {
    return next(error);
  }
};

const listAllTheaters = async (req, res, next) => {
  try {
    const allTheaters = await theatersService.listAll();
    res.status(200).send(allTheaters);
  } catch (error) {
    next(error);
  }
};

const getTheaterById = async (req, res, next) => {
  const { theaterId } = req.params;
  try {
    const theater = await theatersService.getById(theaterId);
    res.status(200).send(theater);
  } catch (error) {
    next(error);
  }
};

const createTheater = async (req, res, next) => {
  const { name, address, email, phone, seatsAvailable } = req.body;

  const image = req.files?.image ? req.files.image[0] : null;

  try {
    // Validálás
    const newTheater = await theatersService.createTheater(
      {
        name,
        address,
        email,
        phone,
        seatsAvailable: Number(seatsAvailable),
      },
      image,
    );
    res.status(201).json(newTheater);
  } catch (error) {
    next(error);
  }
};

const updateTheater = async (req, res, next) => {
  const { theaterId } = req.params;
  const { name, address, email, phone, seatsAvailable } = req.body;

  const image = req.files?.image ? req.files.image[0] : null;

  // Gonosz kis trükk... lényeg, hogy kezelni kell, mert ha nem küldöm a mezőt, akkor NaN-t dob a Number konvertálás, ezért mindig null-ra update-elt...
  const parsedSeats =
    seatsAvailable !== undefined && seatsAvailable !== ""
      ? Number(seatsAvailable)
      : undefined;

  try {
    // Validáció
    const updatedTheater = await theatersService.update(
      theaterId,
      {
        name,
        address,
        email,
        phone,
        seatsAvailable: parsedSeats,
      },
      image,
    );
    res.status(200).json(updatedTheater);
  } catch (error) {
    next(error);
  }
};

const destroyTheater = async (req, res, next) => {
  const { theaterId } = req.params;
  try {
    const deletedTheater = await theatersService.destroy(theaterId);
    res.status(200).json({ deletedTheater });
  } catch (error) {
    next(error);
  }
};

const deleteImage = async (req, res, next) => {
  const { imageUrl } = req.body;
  const { theaterId } = req.params;
  try {
    const deletedImage = await theatersService.deleteSingleImage(
      theaterId,
      imageUrl,
    );
    res.status(200).json({ deletedImage });
  } catch (error) {
    next(error);
  }
};

export default {
  getTheaterForDropdown,
  listAllTheaters,
  getTheaterById,
  createTheater,
  updateTheater,
  destroyTheater,
  deleteImage,
  listAllTheaters,
  getTheaterById,
  createTheater,
  updateTheater,
  destroyTheater,
  deleteImage,
};
