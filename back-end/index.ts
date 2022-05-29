import 'dotenv/config'
import * as express from "express";
import 'express-async-errors';
import './utils/db';
import rateLimit from "express-rate-limit";
import * as cors from "cors";
import {adRouter} from "./routers/ad";


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))


app.use('/ad', adRouter);

app.listen(3002, '0.0.0.0', () => {
    console.log(`App started at http://localhost:3002`);
});
