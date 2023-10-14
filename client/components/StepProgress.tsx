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
};

const StepProgress: React.FC<IHeaderProps> = ({step}) => {
  const [image, setImage] = useState<string | null | ArrayBuffer>()
  const [closeEnough, setCloseEnough] = useState(false)


  const solveStep = async(e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = await new FileReader()
      reader.addEventListener('load', (event) => {
        axios.post(`cloud/stepProgress/${step.id}`, {data: event.target.result})
        setImage(event.target.result)
      });
      reader.readAsDataURL(e.target.files[0]);
      axios.put(`/step/progress/${step.id}`, {
        in_progress: false,
      })
  }


  const getLocation = () => {
    //0.00005 20ft
  navigator.geolocation.watchPosition((position) => {
    console.log(Math.abs(+step.step.latitude - position.coords.latitude))
    if(Math.abs(+step.step.latitude - position.coords.latitude) <  0.5) {
      setCloseEnough(true)
    }
  }, () => console.log('Could not get location'))
 }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <Card sx={{ maxWidth: 345 }}>
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
          {closeEnough && (
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