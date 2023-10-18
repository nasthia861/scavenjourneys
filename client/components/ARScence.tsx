
import React, { useRef, useState } from 'react';
import { ThreeElements, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Box: React.FC<ThreeElements['mesh']> = (props) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClick(!clicked)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Box;
