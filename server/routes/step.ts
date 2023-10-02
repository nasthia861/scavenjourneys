import express from 'express';
import { Step } from "../db/Step";
import { StepProgress } from '../db/StepProgress';
import AppDataSource from '../db';
const router = express.Router();

const stepRepo = AppDataSource.getRepository(Step);
const stepProgressRepo = AppDataSource.getRepository(StepProgress);
const Steps = express.Router();

//GET step by :id
Steps.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const step = await stepRepo.findOneBy({id: parseInt(id)});
    if (step) {
      res.status(200).send(step);
    } else {
      res.status(404).send('Step Error');
    }
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

//GET all steps
Steps.get('/', async (req, res) => {
  try {
    const steps = await stepRepo.find();
    res.status(200).send(steps);

  } catch(err) {
    console.error(err);
    res.send(404).send('Error')
  }
});

//POST new step
Steps.post('/', async (req, res) => {
  const { name, location, journey_id, user_id } = req.body;
  try {
    const newStep = stepRepo.create({ name, location, journey_id, user_id });
    await stepRepo.save(newStep);
    res.status(201).send(newStep);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// PATCH Step progression by :id
Steps.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { in_progress, step_id } = req.body;

  try {
    const step = await stepRepo.findOneBy({ id: parseInt(id)});
    if (step) {
    
      // Find the StepProgress entry for the given step_id
      let stepProgress = await stepProgressRepo.findOne({where: { step_id: step_id }});
      //if step progress exist
      if (stepProgress) {
        // update the progression and save
        stepProgress.in_progress = in_progress;
        await stepProgressRepo.save(stepProgress);
        res.status(200).send(stepProgress);
      } else {
        // stepProgress entry not found
        res.status(404).send('StepProgress not found');
      }
    } else {
      // Step not found
      res.status(404).send('Step not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
export default router;