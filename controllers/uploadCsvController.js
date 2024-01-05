import mongoose from 'mongoose';
import parseCsv from '../utils/csvParser.js';

 const uploadCsvController = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const jsonData = await parseCsv(req.file.buffer);

    if (jsonData.length === 0) {
      return res.status(400).send('Empty CSV file.');
    }

    console.log('jsonData:', jsonData);

    const fieldNames = Object.keys(jsonData[0]);
    console.log('Field Names:', fieldNames);

    const collectionName = 'subscriberDetails'; // Define collection name
    const schema = new mongoose.Schema(
      fieldNames.reduce((acc, curr) => ({ ...acc, [curr]: String }), {}),
      { strict: false }
    );
    const CollectionModel = mongoose.model(collectionName, schema, 'subscribersData');

    await CollectionModel.insertMany(jsonData);

    res.send('File processed and data saved to MongoDB.');
  } catch (error) {
    console.error('Error processing file:', error.message);
    res.status(500).send('Error processing file.');
  }
};

export default uploadCsvController;
