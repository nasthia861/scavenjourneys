import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Box from './ARScence';
import MarkerEntity from './ARSteps';
import { useLocation } from 'react-router-dom';
import { Text3D, Float, Center } from '@react-three/drei';
import helvet from '../styling/ARBackgorund/helvetiker.typeface.json';

interface ARSceneProps {
  StepData: string;
}
const ARScene: React.FC<ARSceneProps> = () => {
  const location = useLocation();
  const stepData = location.state ? location.state.stepData : null;
  console.log(stepData)
  return (
    <>
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



      </>
  );
};

export default ARScene;
