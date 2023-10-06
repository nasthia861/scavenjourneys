import express, { Request, Response } from 'express';;
import { Journey } from "../db/entities/Journey";
import AppDataSource from '../db';

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

//get most recent 20 journeys
journeyRouter.get('/recent', async (req, res) => {
  try {
    const recentJourneys = await journeyRepository.find({
      take: 20, // Limit to the most recent 20 journeys
      order: { created_at: 'DESC' }, // Sort by creation date in descending order
    });
    res.status(200).json(recentJourneys);
  } catch (error) {
    console.error('Error fetching recent journeys:', error);
    res.status(500).send('Internal Server Error');
  }
});

//get journeys by tag
journeyRouter.get('/tag/:name', async(req, res) => {
  const { name } = req.params;
  AppDataSource.manager.find(Journey, {
    relations: ['user', 'tag'],
    where: {
      tag: {
        name: name
      }
    }
  })
    .then((journeys: []) => {
      if(journeys) {
        res.status(200).send(journeys)
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

//get journey by name
journeyRouter.get('/name/:name', async(req, res) => {
  const { name } = req.params;
  AppDataSource.manager.find(Journey, {
    relations: ['user', 'tag'],
    where: {
      name: name,
    }
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


// Create a new journey
journeyRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, img_url } = req.body;

    const journey = journeyRepository.create({
      name,
      description,
      img_url,
    });

    const createdJourney = await journeyRepository.save(journey);
    res.status(201).json(createdJourney);
  } catch (error) {
    console.error('Error creating journey:', error);
    res.status(500).send('Internal Server Error');
  }
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