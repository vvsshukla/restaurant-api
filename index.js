import express from "express";
import bodyParser from "body-parser";
import { generateResponse } from "./controllers/index.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.post('/generate', generateResponse);
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});