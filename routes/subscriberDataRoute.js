import express from 'express';
import subscriberDataController from '../controllers/subscriberDataController.js';

const router = express.Router();

router.post('/subsriber', subscriberDataController);

export default router;
