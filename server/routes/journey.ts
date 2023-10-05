import express from 'express';
import { Journey } from "../db/entities/Journey";
import { Tag } from "../db/entities/Tag";
import AppDataSource from '../db';
import { ArrayContains } from "typeorm";

const journeyRouter = express.Router();
const journeyRepository = AppDataSource.getRepository(Journey);
//const tagRepository = AppDataSource.getRepository(Tag);

//get all journeys
journeyRouter.get('/', async(req, res) => {
  journeyRepository.find()
    .then((journeys: []) => res.status(200).json(journeys))
    .catch((error: null) => {
      console.error('could not get all journeys', error);
      res.status(500);
  })
})

//get journeys by tag
journeyRouter.get('/tag/:id', async(req, res) => {
  const { id } = req.params;
  AppDataSource.manager.findBy(Journey, {
    tagId: +id,
  })
    .then((journeys: []) => {
      console.log(journeys);
      if(journeys) {
        res.status(200).send(journeys)
      } else {
        console.error('could not find tag name');
        res.status(404)
      }
    })
    .catch((error: null) => {
      console.error('could not get journeys by tag', error);
      res.status(500);
  })
})

//get journey by name
journeyRouter.get('/name/:name', async(req, res) => {
  const { name } = req.params;
  AppDataSource.manager.findOneBy(Journey, {
    name: name,
  })
    .then((journey: {}) => {
      if(journey) {
        res.status(200).send(journey)
      } else {
        console.error('could not find journey by name');
        res.status(404)
      }
    })
    .catch((error: null) => {
      console.error('could not get journeys by name', error);
      res.status(500);
  })
})


// create a new journey
journeyRouter.post('/', async (req, res) => {
  const newJourneyData = req.body; // Assuming the request body contains journey data
  const newJourney = journeyRepository.create(newJourneyData);
  await journeyRepository.save(newJourney)
    .then((createdJourney: {}) => res.status(201).json(createdJourney))
    .catch((error: null) => {
      console.error('could not create journey', error);
      res.status(500);
    });
});

// update a journey by id
journeyRouter.put('/:id', async (req, res) => {
  const journeyId = req.params.id;
  const updatedJourneyData = req.body; // Assuming the request body contains updated journey data
  await AppDataSource.manager.update(Journey, {id: journeyId}, updatedJourneyData)
    .then((value) => {
      if (value.affected > 0) {
        res.status(200).json({ message: 'Journey updated successfully' });
      } else {
        res.status(404).json({ message: 'Journey not found' });
      }
    })
    .catch((error: null) => {
      console.error('could not update journey', error);
      res.status(500);
    });
});

// delete a journey by id
journeyRouter.delete('/:id', async (req, res) => {
  const journeyId = req.params.id;
  await AppDataSource.manager.delete(Journey, {id: journeyId})
    .then((result) => {
      if (result.affected > 0) {
        res.status(200).json({ message: 'Journey deleted successfully' });
      } else {
        res.status(404).json({ message: 'Journey not found' });
      }
    })
    .catch((error: null) => {
      console.error('could not delete journey', error);
      res.status(500);
    });
});

export default journeyRouter;