import express from "express";
import checkAuthController from "../controllers/checkAuthController.js";

const router = express.Router();

router.get('/check-auth', checkAuthController)

export default router