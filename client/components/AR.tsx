import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Box from './ARScence';
import MarkerEntity from './ARSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { Text3D, Float, Center } from '@react-three/drei';
import helvet from '../styling/ARBackgorund/helvetiker.typeface.json';





interface ARSceneProps { StepData: string; }

const ARScene: React.FC<ARSceneProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const [isMounted, setIsMounted] = useState(true);


  const stepData = location.state ? location.state.stepData : null;
  // //console.log(stepData)


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
    <>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>

    <Canvas>
      <Suspense fallback={null}>
        <Center>
          <Float floatIntensity={5} speed={2}>
          {stepData &&
          <Text3D
          font={helvet}
            bevelEnabled
            bevelSize={0.05}
            scale={[1, 1, 1]}
            >
          {stepData.step.name}
          </Text3D>}
          </Float>
        </Center>
      </Suspense>
    </Canvas>
    </div>


      <MarkerEntity
      stepName={stepData.step.name}
      latitude={stepData.step.latitude}
      longitude={stepData.step.longitude}
      />
      </>
  );
};

export default ARScene;
