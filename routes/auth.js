import authController from '../controllers/authController.js';
import { Router } from 'express';
import User from '../models/user.js';
import verifyAccessToken from '../middlewares/authenticate.js';

const router = Router();

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Token refresh route
router.post('/refresh-token', authController.refreshToken);

router.get('/me', verifyAccessToken, async (req, res) => {
  const user = await User.findById(req.userId).select('-password -refreshToken');
  return res.json(user);
});

export default router;