import { Router } from 'express';
import OpenAI from "openai";

const chatRouter = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

chatRouter.post('/', async(req, res) => {
  const {answer} = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: [
        {
          "role": "system",
          "content": `create a clue for a scavenger hunt where the answer is '${answer}'. Do not share answer, keep it under 2 sentences.`
        },
      ]
    })
    res.status(201).json(response.choices[0].message.content)
    //res.status(201).json(response)
  }
  catch (error) {
    console.error('could not get chatgpt response', error)
    res.sendStatus(500)
  }

})


export default chatRouter;