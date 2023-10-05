import express from 'express';
import { User } from "../db/entities/User";
import AppDataSource from '../db';

//create repo instance for User entity from AppDataSource
const userRepo = AppDataSource.getRepository(User);
const userRouter = express.Router();

//GET User by :id (tested: √ )
userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userRepo.findOneBy( {id: parseInt(id)  } );
    if (user) {
      res.send(user)
    }
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal Server Error')
  }
});

//GET User by username (tested: √ )
userRouter.get('/username/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userRepo.findOne( { where : {username: username } } );
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send('User not found in database')
    }
  } catch(err) {
    console.error('Database Error', err);
    res.status(500).send('Internal Server Error')
  }
});

//GET all users (tested: √ )
userRouter.get('/', async (req, res) => {
  try {
    const users = await userRepo.find();
    res.status(200).send(users);
  } catch(err) {
    console.error(err);
    res.status(500).send('Error')
  }
});

//POST new user (tested: √ )
userRouter.post('/', async (req, res) => {
  const { username, img_url } = req.body;
  try {
    const newUser = userRepo.create({ username, img_url });
    await userRepo.save(newUser);
    res.status(201).send(newUser);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//Put to adjust user photo (tested: 404)
userRouter.put('/:id/img', async (req, res) => {
  const { id } = req.params;
  const { img_url } = req.body;

  try {
    const user = await userRepo.findOneBy( {id: parseInt(id)  } );

    user.img_url = img_url;
    await userRepo.save(user);
    res.status(200).send(user);
  } catch(err) {
    console.error('Error updating photo', err);
    res.status(500).send('Internal Server Error');
  }

  //Patch to update user username 
  userRouter.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { username } = req.body;
    try {

      const user = await userRepo.findOneBy( { id: parseInt(id) });
      user.username = username;
      await userRepo.save(user);
      res.status(200).send(user);

    } catch (err) {
      console.error('Could not update username', err)
      res.status(500);
    }
  })

});


export default userRouter;
