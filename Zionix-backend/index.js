import express, { json } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
import { configDotenv } from 'dotenv';
import search from './routes/search.js'

configDotenv();

app.use(bodyParser.json());
app.use(cors());
app.use(json());

app.use("/api", search);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
