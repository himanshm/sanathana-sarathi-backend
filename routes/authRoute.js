import express from 'express';
import authUserController from '../controllers/authUserController.js';

const route = express.Router();

route.post('/user-login', authUserController);

export default route;
