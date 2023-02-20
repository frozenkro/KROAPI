import express, { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import { CreateCompletionResponse } from 'openai/dist/api';

const router = express.Router();

router.get('/npmTest', async (req: Request, res: Response) => {
    try {
        const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response: CreateCompletionResponse = (await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.message,
        temperature: 0,
        max_tokens: req.body.size || 2048,
        })).data;

        res.json(response.choices[0].text);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


export default router;