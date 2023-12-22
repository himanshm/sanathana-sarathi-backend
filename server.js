import express from 'express';
import bodyParser from 'body-parser';
import { mongoose } from 'mongoose';
import subscriberRoute from './routes/subscriberRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());
// Connect to MongoDB

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo DB');
  } catch (error) {
    console.error(`Could not connect to mongoDB ${error}`);
    process.exit(1); // Exit process with failure. This is useful to prevent the application from running when it cannot connect to the database.
  }
};
connectToMongoDB();

app.use('/api', subscriberRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
