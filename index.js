import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());

const startApp = async () => {
    try {
        app.listen(PORT, () => console.log(`Started a ${PORT} server`));
    } catch (err) {
        console.log(err);
    }
};

startApp();