import express from 'express';
import { Tag } from "../db/entities/Tag";
import AppDataSource from '../db';

const tagRouter = express.Router();
const tagRepository = AppDataSource.getRepository(Tag)

// get all tags
tagRouter.get('/', async (req, res) => {
  try {
    const tags = await tagRepository.find();
    res.status(200).json(tags);
  } catch (error) {
    console.error('Could not get all steps', error);
    res.status(500).send('Internal Server Error');
  }
});

// get tags by name
tagRouter.get('/name/:arrayString', async(req, res) => {
  const { arrayString } = req.params
  let array = arrayString.split(',');

  let allTags = array.map((tag) => {
    return {name: tag}
  })

  const tagsData = await tagRepository.find({
    where: allTags
  })
  res.status(200).json(tagsData)
})



export default tagRouter;