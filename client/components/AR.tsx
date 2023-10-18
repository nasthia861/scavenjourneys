import React from 'react';
import { Canvas } from '@react-three/fiber';
import Box from './ARScence';
import MarkerEntity from './ARSteps';

const ARScene: React.FC = () => {
  return (
    <><Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />

    </Canvas>
    {/* <MarkerEntity position={[0, 8, -5]} text="Journey: Get to Know Nola!" />
      <MarkerEntity position={[-5, 5, -5]} text="Step 1: Take a selfie at Cafe Du Monde" rotation={[0, 45, 0]} />
      <MarkerEntity position={[-5, 2, -5]} text="Step 2: Say Hay to the animal at the center of Jackson Square" rotation={[0, 45, 0]} />
      <MarkerEntity position={[5, 2, -3]} text="Step 3: Visit the Riverfront to hear some steamboat tunes!" rotation={[0, -45, 0]} /> */}
    <Canvas>

      </Canvas>



      </>
  );
};

export default ARScene;
