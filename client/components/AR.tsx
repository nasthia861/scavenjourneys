import React, { Suspense, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MarkerEntity from './ARSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { StepProgressType } from '@this/types/StepProgress';





// interface ARSceneProps { stepData: StepProgressType; }

const ARScene: React.FC = () => {
  const navigate = useNavigate();

  // const [isMounted, setIsMounted] = useState(true);

  const location: {state: {step: StepProgressType, userId: number }} = useLocation();
  const stepData = location.state.step;
  const userId = location.state.userId;

  const canvas = useRef(null);
  const video = useRef(null);
  const image = document.getElementById("picture")

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [journeyProgressId, setJourneyProgressId] = useState<number | null>(null);


  const letsDraw = () => {

    if(canvas.current && video.current) {
      const ctx = canvas.current.getContext('2d');
      ctx.drawImage(video.current, 0, 0, 400, 300);

      const data = canvas.current.toDataURL("image/png");
      setImageSrc(data);
    }
  }

  const letsStream = () => {
    setJourneyProgressId(stepData.journey_progress.id)

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: {
        facingMode: "environment",
      }, audio: false })
      .then((stream) => {
        video.current.srcObject = stream;
      })
      .catch((error) => {
        console.log("Something went wrong!", error);
      });
    }
  }

  useEffect(() => {
    letsStream()
  }, [])

  useEffect(() => {
    if(imageSrc !== null) {
          // use this once you have an image
      axios.post(`/cloud/stepProgress/${stepData.id}`, {data: imageSrc})
        .then((response) => {
          axios.put(`/step/progress/${stepData.id}`, {
            in_progress: false,
            image_url: response.data.secure_url
          })
        })
        .then(() => {
          navigate(`/profile/${userId}`, {state: {journeyProgressId}})
        })
    }
  }, [imageSrc])


    // useEffect(() => {

    //   const aframeScript = document.createElement('script');
    //   aframeScript.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
    //   document.head.appendChild(aframeScript);
    //   //aframeScript.async = true


    //   const AR_Script = document.createElement('script');
    //   AR_Script.src = "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js";
    //   document.head.appendChild(AR_Script);

    //   aframeScript.onload = () => {
    //     AR_Script.onload = () => {
    //       // Initialize your AR components here
    //     };
    //   };

    //   return () => {
    //     aframeScript && aframeScript.remove();
    //     AR_Script && AR_Script.remove();
    //   };
    // }, []);
  return (
    <div>
      <button onClick={letsDraw}>Click</button>
      <video
        ref={video}
        autoPlay={true}
        width="400"
        height="300"
        ></video>
      <canvas ref={canvas} width="400" height="300" />
      <image id="picture" src={imageSrc}></image>
      <MarkerEntity
      stepName={stepData.step.name}
      latitude={stepData.step.latitude}
      longitude={stepData.step.longitude}
      letsDraw={letsDraw}
      />
    </div>




    // <>

    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>

    // </div>


  );
};

export default ARScene;
