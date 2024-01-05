import express from 'express';
import printLabelController from '../controllers/printLabelController.js';

const router = express.Router();

router.post('/print-labels', printLabelController)

export default router;