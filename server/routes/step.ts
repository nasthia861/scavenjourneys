import express from 'express';
import { Step } from "../db/entities/Step";
import { StepProgress } from '../db/entities/StepProgress';
import { Journey } from '../db/entities/Journey';
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


// // GET all step progresses assigned to a user
stepRouter.get('/progress/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {

    const steps = await stepProgressRepo.find({
      //relations: ['journey_progress', 'user'],
      where: {
        journey_progress :  {
          user: {
            id: +userId,
          }
        }
      },
      take: 5,
      order: { started_at: 'DESC'}
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

// POST to assign step_progress to user with journey progress
stepRouter.post('/progress/', async (req, res) => {
  const { journey_progress, step } = req.body;

  try {
    const stepProgress = stepProgressRepo.create({
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

//GET all steps in journey progress
stepRouter.get('/progress/:progressId', async (req, res) => {
  const {progressId} = req.params;
  try {
    const progress = await stepProgressRepo.find({
      relations: ['journey_progress', 'step'],
      where: {
        journey_progress: {
          id: +progressId
        }
      }
    })
    res.status(200).send(progress);
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
})


// update a step_progress by id
stepRouter.put('/progress/:id', async (req, res) => {
  const stepId = req.params.id;
  const updatedStepData = req.body; // Assuming the request body contains updated step data
  try {
    const result = await stepProgressRepo.update(stepId, updatedStepData);
    if (result.affected > 0) {
      res.status(200).json({ message: 'Step progress updated successfully' });
    } else {
      res.status(404).json({ message: 'Step progress not found' });
    }
  } catch (error) {
    console.error('Could not update step', error);
    res.status(500).send('Internal Server Error');
  }
});

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




export default stepRouter;