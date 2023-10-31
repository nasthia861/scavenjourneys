import React, { Suspense, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MarkerEntity from './ARSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { StepProgressType } from '@this/types/StepProgress';

type IHeaderProps = {
  userId: number
  step: StepProgressType
};

const AR: React.FC<IHeaderProps> = ({userId, step}) => {

  // const [isMounted, setIsMounted] = useState(true);

  // const location: {state: {step: StepProgressType, userId: number }} = useLocation();
  // const stepData = location.state.step;
  //const userId = location.state.userId;

  const canvas = useRef(null);
  const video = useRef(null);
  let videoStream: MediaStream = null;

  // const image = document.getElementById("picture")

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [journeyProgressId, setJourneyProgressId] = useState<number | null>(null);


  const letsDraw = () => {

    if(canvas.current && video.current) {
      const ctx = canvas.current.getContext('2d');
      ctx.drawImage(video.current, 0, 0, video.current.naturalWidth, video.current.naturalHeight);

      const data = canvas.current.toDataURL("image/png");
      setImageSrc(data);
    }
  }

  const letsStream = () => {
    setJourneyProgressId(step.journey_progress.id)

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: {
        facingMode: "environment",
      }, audio: false })

      .then((stream) => {
        video.current.srcObject = stream;
        videoStream = stream;
      })
      .catch((error) => {
        console.log("Something went wrong!", error);
      });
    }
  }
  const stopStream = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
    }
  };


  useEffect(() => {
    letsStream()
    return () => {
      stopStream();
    };
  }, [])

  useEffect(() => {
    if(imageSrc !== null) {
          // use this once you have an image
      axios.post(`/cloud/stepProgress/${step.id}`, {data: imageSrc})
        .then((response) => {
          axios.put(`/step/progress/${step.id}`, {
            in_progress: false,
            image_url: response.data.secure_url
          })
        })
        .then(() => {
          console.log('navigating', userId, journeyProgressId)
          document.exitFullscreen();
        })
    }
  }, [imageSrc])

  return (
    <div>
      <video
        hidden
        ref={video}
        autoPlay={true}
        width={videoWidth}
        height={videoHeight}
        ></video>
      <canvas
        hidden
        ref={canvas}
              />
      <MarkerEntity
      stepName={step.step.name}
      latitude={step.step.latitude}
      longitude={step.step.longitude}
      letsDraw={letsDraw}
      />
    </div>


  );
};

export default AR;
