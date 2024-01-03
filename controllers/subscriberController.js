import express from 'express';
import multer from 'multer';
import csvtojson from 'csvtojson';
import mongoose from 'mongoose';

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Convert CSV to JSON
    const jsonData = await csvtojson().fromString(req.file.buffer.toString());

    if (jsonData.length === 0) {
      return res.status(400).send('Empty CSV file.');
    }

    // Extract collection name and data
    const collectionName = jsonData[0]['name'];
    if (!collectionName || typeof collectionName !== 'string') {
      return res.status(400).send('Invalid collection name in CSV.');
    }
    jsonData.shift();

    // Dynamically create a model
    const CollectionModel = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }));

    // Insert data into the collection
    await CollectionModel.insertMany(jsonData);

    res.send('File processed and data saved to MongoDB.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing file.');
  }
});

export default router;
