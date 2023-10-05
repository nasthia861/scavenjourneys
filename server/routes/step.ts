import express from 'express';
import { Step } from "../db/entities/Step";
import { StepProgress } from '../db/entities/StepProgress';
import AppDataSource from '../db';
import { User } from '../db/entities/User';

const stepRouter = express.Router();
const stepRepository = AppDataSource.getRepository(Step)

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
stepRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const steps = await AppDataSource.getRepository(Step)
    .createQueryBuilder('step')
    .leftJoinAndSelect('user.id', 'user')
    .where('user.id = :userId', { userId: +userId })
    .getMany();
     //debugger;
    console.log(steps)
    res.status(200).send(steps)

  } catch(err) {
    console.error("Error getting user Steps", err);
    res.status(404).send(err)
  }
});


// stepRouter.get('/user/:id', async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const steps = await AppDataSource.manager.find(Step, {
//       relations: { userId: true},
//       where: {
//         userId: +id,
//       }
//     });

//     if (steps) {
//       res.status(200).json(steps);
//     } else {
//       console.error( id);
//       res.status(404).send('Steps not found');
//     }
//   } catch (error) {

//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // get Steps by journeyId
// stepRouter.get('/journey/:journeyId', async (req, res) => {
//   const { journeyId } = req.params;

//   try {
//     const steps = await stepRepository.find({where: {  journey: parseInt(journeyId) } } )
//     console.log(steps)
//     res.status(200).send(steps)

//   } catch(err) {
//     console.error("Error getting journey", err);
//     res.status(404).send(err)
//   }
// });

export default stepRouter;