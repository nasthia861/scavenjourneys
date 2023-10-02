import express from 'express';
import { User } from "../db/User";
import AppDataSource from '../db';

//create repo instance for User entity from AppDataSource
const userRepo = AppDataSource.getRepository(User);
const Users = express.Router();

//GET User by :id
Users.get('/:id', async (req, res) => {
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

//GET User by username
Users.get('/username/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userRepo.findOneBy( {username: username } );
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send('User not found in database')
    }
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal Server Error')
  }
});

//GET all users
Users.get('/', async (req, res) => {
  try {
    const users = await userRepo.find();
    res.status(200).send(users);
  } catch(err) {
    console.error(err);
    res.status(500).send('Error')
  }
});

//POST new user
Users.post('/', async (req, res) => {
  const { username, img_url } = req.body;
  try {
    const newUser = userRepo.create({ username, img_url });
    await userRepo.save(newUser);
    res.status(200).send(newUser);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
});


export default Users;