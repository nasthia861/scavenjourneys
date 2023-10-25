import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Box from './ARScence';
import MarkerEntity from './ARSteps';
import { useLocation } from 'react-router-dom';
import { Text3D, Float, Center } from '@react-three/drei';
import helvet from '../styling/ARBackgorund/helvetiker.typeface.json';
import { HelmetProvider, Helmet } from 'react-helmet-async';
// import * as VR from "!exports-loader?WEBVR!three/examples/js/vr/WebVR";
import { VRButton } from 'client/addons/VRButton';
//import * as VR from "!exports-loader?WEBVR!three/examples/js/vr/WebVR";




interface ARSceneProps { StepData: string; }

const ARScene: React.FC<ARSceneProps> = () => {
  const location = useLocation();
  const stepData = location.state ? location.state.stepData : null;
  // //console.log(stepData)

  // useEffect(() => {

  //   const aframeScript = document.createElement('script');
  //   aframeScript.src = 'https://aframe.io/releases/1.2.0/aframe.min.js';
  //   document.head.appendChild(aframeScript);
  //   aframeScript.async = true

  //   const AR_Script = document.createElement('script');
  //   AR_Script.async = true
  //   AR_Script.src = 'https://cdn.rawgit.com/jeromeetienne/AR.js/2.0.8/aframe/build/aframe-ar.js';
  //   document.head.appendChild(AR_Script);

  //   return () => {
  //     aframeScript && aframeScript.remove();
  //     AR_Script && AR_Script.remove();
  //   };
  // }, []);

  return (
    <>
        {/* <HelmetProvider>
        <Helmet>
          <script
          src="https://aframe.io/releases/1.2.0/aframe.min.js"
          async
          />
          <script
          src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"
          async
          ></script>
        </Helmet> */}


    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>

    <Canvas>
      <Suspense fallback={null}>
        <Center>
          <Float floatIntensity={5} speed={2}>
          {stepData &&
           <Text3D
           font={helvet}
            bevelEnabled
            bevelSize={0.05}
            scale={[2, 2, 1]}
            >
          {stepData.step.name}
          </Text3D>}
          </Float>
        </Center>
      </Suspense>
    </Canvas>

    {/* <MarkerEntity position={[0, 8, -5]} text="Journey: Get to Know Nola!" stepName={'Journey: Get to Know Nola!'} /> */}
      {/* <MarkerEntity position={[-5, 5, -5]} text="Step 1: Take a selfie at Cafe Du Monde" rotation={[0, 45, 0]} stepName={''} />
      <MarkerEntity position={[-5, 2, -5]} text="Step 2: Say Hay to the animal at the center of Jackson Square" rotation={[0, 45, 0]} stepName={''} />
      <MarkerEntity position={[5, 2, -3]} text="Step 3: Visit the Riverfront to hear some steamboat tunes!" rotation={[0, -45, 0]} stepName={''} /> */}

      <MarkerEntity
      stepName={stepData.step.name}
      latitude={stepData.step.latitude}
      longitude={stepData.step.longitude}
      />
      {/* </HelmetProvider> */}
      </>
  );
};

export default ARScene;
