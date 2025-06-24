import authController from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

export default router;