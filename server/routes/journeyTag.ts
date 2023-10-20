import express from 'express';
import { Between } from 'typeorm';
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

// get journeyTags by tag name
journeyTagRouter.get('/name/:latitude/:longitude/:alignment/:name', async(req, res) => {
  const { name, latitude, longitude, alignment } = req.params
  const latNum = Number(latitude);
  const longNum = Number(longitude);
  const distance = Number(alignment);

  try {
    const journeys = await journeyTagRepository.find({
      relations: ["journey", "tag"],
      where: {
        journey: {
          latitude: Between(latNum - (0.0725 * distance), latNum + (0.0725 * distance)),
          longitude: Between(longNum - (0.0725 * distance), longNum + (0.0725 * distance)),
        },
        tag: { name: name} },
    })
    .then((journeys: []) => {
      if(journeys) {
        let justJourneys = journeys.map((journey: {journey: {}}) => {
          return journey.journey
        })
        res.status(200).send(justJourneys)
      } else {
        console.error('could not find journey by name');
        res.status(404)
      }
    })
  }
  catch(error) {
    console.error('could not get journeys associated with tag', error);
    res.status(500);
  }

})



export default journeyTagRouter;