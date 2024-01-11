import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';

import initialiseAdminUser from './utils/initialiseAdminUser.js';
// import labelGenerator from './labelGenerator.js'

// Routes
import uploadCsvRoute from './routes/uploadCsvRoute.js';
import printLabelRoute from './routes/printLabelRoute.js';
import subscriberDataRoute from './routes/subscriberDataRoute.js';
import authRoute from './routes/authRoute.js';
import userLogoutRoute from './routes/userLogoutRoute.js';
import checkAuthRoute from './routes/checkAuthRoute.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// configure cors

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true, //access-control-allow-credentials:true
};
app.use(cors(corsOptions));

// Improved MongoDB connection function
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectToMongoDB();
    console.log('Connected to Mongo DB');

    await initialiseAdminUser();
    console.log('Admin user initialised.');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using https
  })
);

app.use('/api', uploadCsvRoute);
app.use('/api', printLabelRoute);
app.use('/api', subscriberDataRoute);
app.use('/api', authRoute);
app.use('/api', userLogoutRoute);
app.use('/api', checkAuthRoute);
// app.use('/api', labelGenerator);

startServer();
