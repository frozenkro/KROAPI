import express from 'express';
import chatRouter from './routes/chat';
import requestLogger from './utils/requestLogger';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(requestLogger);

app.use('/api/chat', chatRouter);

const port = 3000;
app.listen(port, () => {console.log(`Listening on ${port}`);})