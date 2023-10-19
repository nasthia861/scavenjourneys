// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { TextGeometry } from 'client/addons/TextGeometry';
// import { FontLoader } from 'client/addons/FontLoader';

// const ThreeStepDescription = ({ description }: { description: string }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Set up scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     containerRef.current.appendChild(renderer.domElement);

//     // 3D text geometry
//     const fontLoader = new FontLoader();
//     fontLoader.load('path/to/your/font.json', (font: any) => {

//       const textGeometry = new TextGeometry(description, {
//         font: font,
//         size: 0.2,
//         height: 0.05,
//       });
//       const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
//       const textMesh = new THREE.Mesh(textGeometry, textMaterial);
//       scene.add(textMesh);

//       // Position the text in the scene (eye level)
//       textMesh.position.set(0, 2, -5);

//       // Set up camera position (centered)
//       camera.position.z = 5;

//       // Render the scene
//       const animate = () => {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//       };
//       animate();
//     });

//     // renderer on unmount
//     return () => {
//       renderer.dispose();
//     };
//   }, [description]);

//   return <div ref={containerRef}></div>;
// };

// export default ThreeStepDescription;
