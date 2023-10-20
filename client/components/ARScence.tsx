
import React, { useRef, useState } from 'react';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { TextGeometry } from 'client/addons/TextGeometry';
import * as THREE from 'three';
import { Text } from '@react-three/drei';


const Box: React.FC<ThreeElements['mesh']> = (props) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);


  // Create star-shaped geometry
  const starGeometry = new THREE.BufferGeometry();
  const vertices: number[] = [];

  // Define star shape
  const innerRadius = 0.5;
  const outerRadius = 1.5;
  const numPoints = 5;

  for (let i = 0; i < numPoints * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i / numPoints) * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    vertices.push(x, y, 0);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));


  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
    <points
    {...props}
    ref={meshRef}>
      <primitive object={starGeometry} />
      <pointsMaterial color={hovered ? 'hotpink' : 'orange'} size={0.2} />
    </points>

    <Text position={[0, -3, 0]} color="white" fontSize={1.0}>
      DevDawgs
    </Text>
  </group>
  );
};

export default Box;
