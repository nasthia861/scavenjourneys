import express, { Request, Response } from 'express';;
import { Journey } from "../db/entities/Journey";
import AppDataSource from '../db';
import { Between } from 'typeorm';
import { JourneyProgress } from '../db/entities/JourneyProgress';
import { User } from '../db/entities/User';
import { StepProgress } from '../db/entities/StepProgress';
import { JourneyTag } from '../db/entities/JourneyTag';
import { Step } from '../db/entities/Step';

const journeyRouter = express.Router();
const journeyRepository = AppDataSource.getRepository(Journey);
const journeyProgressRepo = AppDataSource.getRepository(JourneyProgress);
const userRepo = AppDataSource.getRepository(User)

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
journeyRouter.get('/recent/:latitude/:longitude/:alignment', async (req, res) => {
  const { latitude, longitude, alignment } = req.params
  const latNum = Number(latitude);
  const longNum = Number(longitude);
  const distance = Number(alignment);
  try {
    const recentJourneys = await journeyRepository.find({
      relations: ['user'],
      where: {
        latitude: Between(latNum - (0.0725 * distance), latNum + (0.0725 * distance)),
        longitude: Between(longNum - (0.0725 * distance), longNum + (0.0725 * distance))
      },
      //take: 20, // Limit to the most recent 20 journeys
      //order: { created_at: 'DESC'} , // Sort by creation date in descending order
    });
    res.status(200).json(recentJourneys);
  } catch (error) {
    console.error('Error fetching recent journeys:', error);
    res.status(500).send('Internal Server Error');
  }
});

// get journeys by user id
journeyRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userJourneys = await journeyRepository.find({
      relations: {
          user: true
        },
      where: {
        user: { id: parseInt(userId, 10) }
      },
      order: {
        created_at: 'DESC'
      },
    });

    res.status(200).json(userJourneys);
  } catch (error) {
    console.error('Error fetching user-specific journeys:', error);
    res.status(500).send('Internal Server Error');
  }
});

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
    const { name, description, img_url, user, latitude, longitude} = req.body;

    const journey = journeyRepository.create({
      name,
      description,
      img_url,
      user,
      latitude,
      longitude
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

// Delete a journey by id
journeyRouter.delete('/:id', async (req, res) => {
  const journeyId = req.params.id;
  try {
    // Delete associated step progress records
    try {
      await AppDataSource.manager.delete(StepProgress, {
        journey_progress: {
          journey: {
            id: journeyId,
          },
        },
      });
    } catch (stepProgressError) {
      console.error('Error deleting associated step progress records:', stepProgressError);
    }
    // Delete associated journey progress records
    try {
      await AppDataSource.manager.delete(JourneyProgress, {
        journey: {
          id: journeyId,
        },
      });
    } catch (journeyProgressError) {
      console.error('Error deleting associated journey progress records:', journeyProgressError);
    }
    // Delete associated steps
    try {
      await AppDataSource.manager.delete(Step, {
        journey: {
          id: journeyId,
        },
      });
    } catch (stepError) {
      console.error('Error deleting associated steps:', stepError);
    }
    // Delete associated journey tags
    try {
      await AppDataSource.manager.delete(JourneyTag, {
        journey: {
          id: journeyId,
        },
      });
    } catch (journeyTagError) {
      console.error('Error deleting associated journey tags:', journeyTagError);
    }


    // Delete the journey itself
    const result = await AppDataSource.manager.delete(Journey, {
      id: journeyId,
    });

    if (result.affected > 0) {
      res.status(200).json({ message: 'Journey and associated data deleted successfully' });
    } else {
      res.status(404).json({ message: 'Journey not found' });
    }
  } catch (error) {
    console.error('Could not delete journey and associated data', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST journey_progress assigned to user/journey (test: pending )
journeyRouter.post('/progress', async (req, res) => {
  const { userId, journeyId }  = req.body;
  try {
    const user = await userRepo.findOneBy({id: +userId});
    const journey = await journeyRepository.findOneBy({id: +journeyId});


    if (!user || !journey) {
      res.status(404).send('User or Journey not found');
      return;
    }


    const addProgress = journeyProgressRepo.create({
      user,
      journey,
    });
    await journeyProgressRepo.save(addProgress);


    res.status(201).send(addProgress);


  } catch(err) {
    console.error(err);
    res.status(500).send('Internal error');
  }

});

//GET all journey progress
journeyRouter.get('/progress/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const progress = await journeyProgressRepo.find({
      relations: ['journey', 'user'],
      where: {
        user: {
          id: +userId
        }
      }
    })
    res.status(200).send(progress);

  } catch(err) {
    console.error("error", err);
    res.status(500).send(err)
  }
})

// GET JourneyProgress by journeyId
journeyRouter.get('/progress/:journeyId', async (req, res) => {
  const { journeyId } = req.params;

  try {
    const journey = await AppDataSource.manager.find(JourneyProgress, {
      relations: ['journey'],
      where: {
        journey :  {
          id: +journeyId,
        }
      }
    });
    if (journey) {
      res.status(200).json(journey);
    } else {
      res.status(404).send('journey not found');
    }
  } catch (error) {

    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET JourneyProgress by UserId
journeyRouter.get('/progress/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userProgress = await AppDataSource.manager.find(JourneyProgress, {
      relations: ['user'],
      where: {
        user :  {
          id: +userId,
        }
      }
    });

    if (userProgress) {
      res.status(200).json(userProgress);
    } else {
      res.status(404).send('journey not found');
    }
  } catch (error) {

    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

journeyRouter.put('/progress/:journeyId', async (req, res) => {
  const { journeyId } = req.params;
  const { in_progress } = req.body;

  try {
    const journeyProgress = await AppDataSource.manager.findOne(JourneyProgress, {
      relations: ['journey'],
      where: {
          id: +journeyId
      }
    });

    if (!journeyProgress) {
      return res.status(404).send({ message: 'Journey progress not found.' });
    }

    journeyProgress.in_progress = in_progress;

    await AppDataSource.manager.save(JourneyProgress, journeyProgress);

    res.status(200).send(journeyProgress);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err);
  }
});

export default journeyRouter;