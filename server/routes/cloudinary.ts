import { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary'
import axios from 'axios'

const cloudRouter = Router();


// const signUploadForm = (foldername: string, filename: string) => {
//   const timestamp = Math.round((new Date).getTime()/1000);

//   const signature = cloudinary.utils.api_sign_request({
//     timestamp: timestamp,
//     eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
//     public_id: filename,
//     folder: foldername}, process.env.API_SECRET);

//   return { timestamp, signature }
// }


// cloudRouter.post('/:foldername/:filename', async(req, res) => {
//   const { foldername, filename } = req.params;
//   const files = req.body;
//   const {timestamp, signature} = await signUploadForm(foldername, filename)
//   const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`;

//   const formData = new FormData()
//   formData.append("file", files[0]);
//   formData.append("api_key", process.env.API_KEY);
//   formData.append("eager", 'c_pad,h_300,w_400|c_crop,h_200,w_260');
//   formData.append('public_id', filename);
//   formData.append("timestamp", timestamp.toString());
//   formData.append("signature", signature);
//   formData.append('folder', foldername);

//   axios.post(url, formData)
//   .then(() => console.log('submitted'))
//   .catch((error) => console.error(error));


//   // fetch(url, {method: "POST", body: formData})
//   //   .then((response) => console.log(response))
//   //   .then(() => res.sendStatus(201))
//   //   .catch((err) => console.error('could not submit to cloudinary', err))

// })

export default cloudRouter


