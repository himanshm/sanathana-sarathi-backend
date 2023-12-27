import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import csvParserRoute from './controllers/csvParser.js';
import labelGeneratorRoute from './controllers/labelGenerator.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Improved MongoDB connection function
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo DB');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  }
};
connectToMongoDB();

app.use('/api', csvParserRoute);
app.use('/api', labelGeneratorRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
