import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { User, Book, Token } from './models/models.js'
import sequelise from './db/db.js';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL]
}));
app.use(cookieParser());
app.use(express.json());

const startApp = async () => {
    try {
        await sequelise.authenticate();
        await sequelise.sync();
        app.listen(PORT, () => console.log(`Started a ${PORT} server`));
    } catch (err) {
        console.log(err);
    }
};

startApp();