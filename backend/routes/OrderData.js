import express from 'express';
import { order,myorder } from '../controller/OrderController.js';

const router = express.Router();

router.post("/orderdata", order)
router.post('/myorderdata',myorder)

export default router;