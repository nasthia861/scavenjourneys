import { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary'
import axios from 'axios'


const cloudRouter = Router();

cloudinary.config({
  secure: true
});

cloudRouter.post('/:folder/:filename', async(req, res) => {
  const {folder, filename} = req.params;
  const { data } = req.body;

  const options = {
    public_id: `${folder}/${filename}`,
    folder: 'journey'
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(data, options);
    res.status(201).json(result);

  } catch (error) {
    console.error('could not post to cloudinary', error);
  }

})

cloudRouter.get('/:folder/:fileName', async(req, res) => {
  const { folder, fileName } = req.params

  try {
    
  } catch (error) {
    console.error('could not get image from cloudinary', error);
  }
})

export default cloudRouter


