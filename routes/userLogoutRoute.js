import express from 'express';
import userLogoutController from '../controllers/userLogoutController.js';

const router = express.Router();

router.post('/logout', userLogoutController);

export default router;
