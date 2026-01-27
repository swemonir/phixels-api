import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './app/middleware/notFound';
import { Routers } from './app/router';
import globalError from './app/middleware/globalError';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true
}));
app.use(cookieParser());

app.use('/api/v1', Routers)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use(globalError);
app.use(notFound);

export default app;






