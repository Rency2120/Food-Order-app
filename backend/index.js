import express from "express";
import cors from "cors";
import connectToMongodb from "./db/connectToMongodb.js";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import useRouter from './routes/userRouter.js'
import displayData from './routes/DisplayData.js'
import orderData from './routes/OrderData.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

connectToMongodb();

const port = 3005;

app.use("/api", useRouter);
app.use("/api", displayData)
app.use("/api",orderData)

app.listen(port, ()=>{
    console.log(`Example app is listening on ${port} `)
})