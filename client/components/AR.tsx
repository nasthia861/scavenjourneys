import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Box from './ARScence';
import MarkerEntity from './ARSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { Text3D, Float, Center, RenderTexture } from '@react-three/drei';
import helvet from '../styling/ARBackgorund/helvetiker.typeface.json';





interface ARSceneProps { StepData: string; }

const ARScene: React.FC<ARSceneProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const [isMounted, setIsMounted] = useState(true);


  const stepData = location.state ? location.state.stepData : null;
  // //console.log(stepData)
  const canvas = useRef(null);
  const video = useRef(null);


  const letsDraw = () => {
    const animation = new Image();
    animation.onload = () => {
      if(canvas.current && video.current) {
        const ctx = canvas.current.getContext('2d');
        //ctx.clearRect()
        ctx.drawImage(video.current, 0, 0, 400, 300);
        ctx.drawImage(animation, 0, 0, 100, 100)
      }
      requestAnimationFrame(letsDraw)
    }
    animation.src = 'https://bananamojis.com/api/img/bananas/lg/boonana.png'
  }

  const letsStream = () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
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
    letsDraw()
  }, [])










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
      <video
        ref={video}
        autoPlay={true}
        width="40"
        height="30"
        ></video>
      <canvas ref={canvas} width="400" height="300" />
    </div>





      // <Canvas>

      //   <Suspense fallback={null}>
      //     <Center>
      //       <Float floatIntensity={5} speed={2}>
      //       {stepData &&
      //       <Text3D
      //       font={helvet}
      //         bevelEnabled
      //         bevelSize={0.05}
      //         scale={[1, 1, 1]}
      //         >
      //       {stepData.step.name}
      //       </Text3D>}
      //       </Float>
      //     </Center>
      //   </Suspense>
      // </Canvas>





    // <>

    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>

    // </div>


    //   <MarkerEntity
    //   stepName={stepData.step.name}
    //   latitude={stepData.step.latitude}
    //   longitude={stepData.step.longitude}
    //   stepData={stepData}
    //   />
    //   </>
  );
};

export default ARScene;
