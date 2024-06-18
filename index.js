import 'dotenv/config';
import errorHandler from './middleware/ErrorHandingMiddleware.js'
import { User, Book, Token } from './models/models.js'
import cookieParser from 'cookie-parser';
import router from './routers/index.js'
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
app.use('/api', router);
app.use(errorHandler);

const startApp = async () => {
    try {
        await sequelise.authenticate();
        await sequelise.sync();
        // Token.drop();
        // Book.drop();
        // User.drop();
        app.listen(PORT, () => console.log(`Started a ${PORT} server`));
    } catch (err) {
        console.log(err);
    }
};

startApp();