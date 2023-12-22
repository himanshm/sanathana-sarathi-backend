import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { uploadSubscriber } from '../controllers/subscriberController.js';
import { fileURLToPath } from 'url';

const router = express.Router();

router.post('/import', uploadSubscriber);

export default router;
