import express, { Request, Response } from 'express';
const chatRouter = require('./routes/chat')

const app = express();

app.use('/api/chat', chatRouter)

const port = 3000;
app.listen(port, () => {console.log(`Listening on ${port}`);})