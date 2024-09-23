import express from 'express';
import { handleLogin, handleLogout } from '../controllers/authController.js';
import { isLoggedOut, isLoggenIn } from '../middleware/authentication.js';
const router = express.Router();
// (1) Adding the middlewares
router.post('/login', isLoggedOut, handleLogin);
router.post('/logout', isLoggenIn, handleLogout);
export default router;
