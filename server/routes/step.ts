import express from 'express';
import { Step } from "../db/entities/Step";
import { StepProgress } from '../db/entities/StepProgress';
import AppDataSource from '../db';
import { User } from '../db/entities/User';
import { RateReviewSharp } from '@mui/icons-material';

const stepRouter = express.Router();
const stepRepository = AppDataSource.getRepository(Step)
const stepProgressRepo = AppDataSource.getRepository(StepProgress);

// get all steps (probs not very useful)
stepRouter.get('/', async (req, res) => {
  try {
    const steps = await stepRepository.find();
    res.status(200).json(steps);
  } catch (error) {
    console.error('Could not get all steps', error);
    res.status(500).send('Internal Server Error');
  }
});

// get steps by journey
// stepRouter.get('/journey/:journeyId', async (req, res) => {
//   const { journeyId } = req.params;
//   try {
//     const steps = await stepRepository.find({
//       relations: {
//         journey_id: true,
//       },
//       where: {
//         journey_id: Number(journeyId)
//       },
//     });
//     res.status(200).json(steps);
//   } catch (error) {
//     console.error('Could not get steps by journey', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// create a step
stepRouter.post('/', async (req, res) => {
  const newStepData = req.body; // Assuming the request body contains step data
  try {
    const newStep = stepRepository.create(newStepData);
    await stepRepository.save(newStep);
    res.status(201).json(newStep);
  } catch (error) {
    console.error('Could not create step', error);
    res.status(500).send('Internal Server Error');
  }
});

// update a step by id
stepRouter.put('/:id', async (req, res) => {
  const stepId = req.params.id;
  const updatedStepData = req.body; // Assuming the request body contains updated step data
  try {
    const result = await stepRepository.update(stepId, updatedStepData);
    if (result.affected > 0) {
      res.status(200).json({ message: 'Step updated successfully' });
    } else {
      res.status(404).json({ message: 'Step not found' });
    }
  } catch (error) {
    console.error('Could not update step', error);
    res.status(500).send('Internal Server Error');
  }
});

// delete a step by id
stepRouter.delete('/:id', async (req, res) => {
  const stepId = req.params.id;
  try {
    const result = await stepRepository.delete(stepId);
    if (result.affected > 0) {
      res.status(200).json({ message: 'Step deleted successfully' });
    } else {
      res.status(404).json({ message: 'Step not found' });
    }
  } catch (error) {
    console.error('Could not delete step', error);
    res.status(500).send('Internal Server Error');
  }
});

// get Steps by userId
// stepRouter.get('/user/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const steps = await stepRepository.find({
//       relations: ['user'],
//      where: {
//       user: {
//         id: +userId
//       }
//     }
//      })
//      //debugger;
//     console.log(steps)
//     res.status(200).send(steps)

//   } catch(err) {
//     console.error("Error getting user Steps", err);
//     res.status(404).send(err)
//   }
// });

// GET all steps assigned to a user
stepRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const steps = await AppDataSource.manager.find(Step, {
      relations: ['user'],
      where: {
        user :  {
          id: +userId,
        }
      }
    });

    if (steps) {
      res.status(200).json(steps);
    } else {
      res.status(404).send('Steps not found');
    }
  } catch (error) {

    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// // get Steps by journeyId
stepRouter.get('/journey/:journeyId', async (req, res) => {
  const { journeyId } = req.params;

  try {
    const steps = await AppDataSource.manager.find(Step, {
      relations: ['journey'],
      where: {
        journey :  {
          id: +journeyId,
        }
      }
    });

    if (steps) {
      res.status(200).json(steps);
    } else {
      res.status(404).send('Steps not found');
    }
  } catch (error) {

    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// POST to assign step_progress to step
stepRouter.post('/progress', async (req, res) => {
  const { in_progress, image_url, started_at, journey_progress, step } = req.body;

  try {
    const stepProgress = stepProgressRepo.create({
      in_progress,
      image_url,
      started_at,
      journey_progress,
      step
    });
    await stepProgressRepo.save(stepProgress);
    res.sendStatus(201);
  } catch(err) {
    console.error(err);
    res.send(500).send('Internal Server Error')
  }

});

//GET all steps in prgress
stepRouter.get('/progress', async (req, res) => {
  try {
    const progress = await stepProgressRepo.find()
    res.status(200).send(progress);
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
})

// GET stepPorgress by stepId
stepRouter.get('/progress/:stepId', async (req, res) => {
  const { stepId } = req.params;

  try {
    const steps = await AppDataSource.manager.find(StepProgress, {
      relations: ['step'],
      where: {
        step :  {
          id: +stepId,
        }
      }
    });

    if (steps) {
      res.status(200).json(steps);
    } else {
      res.status(404).send('Steps not found');
    }
  } catch (error) {

    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET stepProgress by journeyProgress
stepRouter.get('/journey_progress/:journeyProgressId', async (req, res) => {
  const { journeyProgressId } = req.params;

  try {
    const userProgress = await AppDataSource.manager.find(StepProgress, {
      relations: ['journey_progress'],
      where: {
        journey_progress :  {
          id: +journeyProgressId,
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



export default stepRouter;