import express from 'express';
import multer from 'multer';
import uploadCsvController from '../controllers/uploadCsvController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), uploadCsvController);

export default router;
