import express from 'express';
import { login, signup, validateUser } from '../controller/userController.js';

const router = express.Router();

router.post("/createuser", validateUser, signup);
router.post("/login",login)
export default router;