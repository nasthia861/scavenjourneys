import express from 'express';
import { Journey } from "../db/entities/Journey";
import AppDataSource from '../db';
import { ArrayContains } from "typeorm";

const journeyRouter = express.Router();
const journeyRepository = AppDataSource.getRepository(Journey)

//get all journeys
journeyRouter.get('/', async(req, res) => {
  journeyRepository.find()
    .then((journeys) => res.status(200).json(journeys))
    .catch((error) => {
      console.error('could not get all journeys', error);
      res.status(500);
  })
})

//get journeys by journeytag
journeyRouter.get('/journeyTag/:name', async(req, res) => {
  const { name } = req.params;
  journeyRepository.find({
    relations: {
      journeyTags: true,
    },
    where: {
      journeyTags: ArrayContains([{name}])
    }
  })
    .then((journeys) => {
      if(journeys) {
        res.status(200).send(journeys)
      } else {
        console.error('could not find tag name');
        res.status(404)
      }
    })
    .catch((error) => {
      console.error('could not get journeys by tag', error);
      res.status(500);
  })
})


export default journeyRouter;