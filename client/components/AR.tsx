import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Box from './ARScence';
import MarkerEntity from './ARSteps';
import { Text3D, Float, Center } from '@react-three/drei';
import helvet from '../styling/ARBackgorund/helvetiker.typeface.json'

interface ARSceneProps {
  stepName: string;
}
const ARScene: React.FC<ARSceneProps> = () => {
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

            <Text3D
            font={helvet}
            bevelEnabeled
            bevelSize={0.05}
            >

            Floating Journey Step
            </Text3D>



          </Float>

        </Center>

      </Suspense>

    </Canvas>

    {/* <MarkerEntity position={[0, 8, -5]} text="Journey: Get to Know Nola!" stepName={'Journey: Get to Know Nola!'} /> */}
      {/* <MarkerEntity position={[-5, 5, -5]} text="Step 1: Take a selfie at Cafe Du Monde" rotation={[0, 45, 0]} stepName={''} />
      <MarkerEntity position={[-5, 2, -5]} text="Step 2: Say Hay to the animal at the center of Jackson Square" rotation={[0, 45, 0]} stepName={''} />
      <MarkerEntity position={[5, 2, -3]} text="Step 3: Visit the Riverfront to hear some steamboat tunes!" rotation={[0, -45, 0]} stepName={''} /> */}

  {/* <MarkerEntity position={[0, 8, -5]} text={`Journey: ${}`} stepName={''} /> */}


      </>
  );
};

export default ARScene;
