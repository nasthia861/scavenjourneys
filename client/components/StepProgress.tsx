import React, { useState, useContext } from 'react';
import { StepProgressType } from '@this/types/StepProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
  const [image, setImage] = useState<string | null>(step.image_url)
  const [description, setDescription] = useState('')


  const toggleDescription = () => {
    if(description.length === 0) {
      setDescription(step.step.hint)
    } else {
      setDescription('');
    }
  }

  const solveStep = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {files} = e.target;
      let imgSrc = URL.createObjectURL(files[0])
      setImage(imgSrc);
  }

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
          <Button size="small" onClick={solveStep}>Found it!</Button>
        </CardActions>
    </Card>









      // <ImageListItem>
      //     {(image.length > 0) ? <div/> :
      //       <img
      //     src={image}
      //     loading="lazy"
      //     />
      //     }
      //   <ImageListItemBar
      //     title={step.step.name}
      //     //subtitle={step.step.user.username}
      //     actionIcon={
      //       <IconButton
      //         sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
      //         aria-label={step.step.hint}
      //         // onClick={toggleDescription}
      //       >
      //         <InfoIcon />
      //       </IconButton>
      //     }
      //   />
      //   {/* <input
      //     id="cameraInput"
      //     type="file"
      //     accept="image/*"
      //     capture
      //     onChange={(e) => solveStep(e)}/> */}
      // </ImageListItem>
  );
};

export default StepProgress;