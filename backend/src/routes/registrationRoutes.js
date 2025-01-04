import express from 'express';
import registrationController from '../controllers/registrationController.js';

const router = express.Router();

// Regisztrációs végpont
router.post('/register', registrationController.registerUser);

export default router;
