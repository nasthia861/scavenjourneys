import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { StepProgressType } from '@this/types/StepProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import uploadImage from '../../server/cloudinary/cloudinary';

// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
// import Button from "@mui/material/Button";



type IHeaderProps = {
  step: StepProgressType
  userLat: number;
  userLong: number;
};

const StepProgress: React.FC<IHeaderProps> = ({step, userLat, userLong}) => {
  const [image, setImage] = useState<string | null | ArrayBuffer>()
  const [closeEnough, setCloseEnough] = useState(false)


  const solveStep = async(e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = await new FileReader()
      reader.addEventListener('load', (event) => {
        axios.post(`cloud/stepProgress/${step.id}`, {data: event.target.result})
          .then((response) => {
            axios.put(`/step/progress/${step.id}`, {
              in_progress: false,
              image_url: response.data.secure_url
            })
          })
        setImage(event.target.result)
      });
      reader.readAsDataURL(e.target.files[0]);
  }



  const getLocation = () => {
    //0.00005 20ft
    if(Math.abs(+step.step.latitude - userLat) <  0.5) {
      setCloseEnough(true)
    }
 }

  useEffect(() => {
    getLocation()
  }, [userLat])

  return (
    <Card sx={{ maxWidth: 345 }}>
        {!step.in_progress && (<CardMedia
          sx={{ height: 140 }}
          image={step.image_url}
        />)}
        {image && (<CardMedia
          sx={{ height: 140 }}
          image={image}
        />)}
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {step.step.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {step.step.hint}
        </Typography>
        </CardContent>
        <CardActions>
          {closeEnough && step.in_progress && (
              <input
              id="cameraInput"
              // label="Solve Step"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => solveStep(e)}/>
           )}
        </CardActions>
    </Card>

  );
};

export default StepProgress;