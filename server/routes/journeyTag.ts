import express from 'express';
import { JourneyTag } from "../db/entities/JourneyTag";
import AppDataSource from '../db';

const journeyTagRouter = express.Router();
const journeyTagRepository = AppDataSource.getRepository(JourneyTag)

// get all journeyTags
journeyTagRouter.get('/', async (req, res) => {
  try {
    const journeyTags = await journeyTagRepository.find();
    res.status(200).json(journeyTags);
  } catch (error) {
    console.error('Could not get all steps', error);
    res.status(500).send('Internal Server Error');
  }
});

journeyTagRouter.post('/', async(req, res) => {
  try {
    const journeyTag = journeyTagRepository.create(req.body);
    journeyTagRepository.save(journeyTag);
    res.status(201).json(journeyTag);
  }
  catch(err) {
    console.error(err);
    res.sendStatus(500);
  }


})

// get tags by name
// tagRouter.get('/name/:arrayString', async(req, res) => {
//   const { arrayString } = req.params
//   let array = arrayString.split(',');

//   let moth = array.map((tag) => {
//     return {name: tag}
//   })

//   const tagsData = await tagRepository.find({
//     where: moth
//   })
//   console.log(tagsData);
//   res.status(200).json(tagsData)
// })



export default journeyTagRouter;