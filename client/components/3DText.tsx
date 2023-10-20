// import React, { useRef, useMemo } from 'react';
// import * as THREE from 'three';
// import { TextGeometry } from 'client/addons/TextGeometry';


// const ThreeDText = ({ text, size, height, ...props }) => {
//   const font = new THREE.Font();
//   const geometry = useMemo(() => {
//     return new TextGeometry(text, {
//       font,
//       size: size || 1,
//       height: height || 0.1,
//       ...props,
//     });
//   }, [text, size, height, props]);

//   return (
//     <mesh geometry={geometry}>
// //       <meshStandardMaterial color={0xff0000} />
// //     </mesh>
// //   );
// // };

// export default ThreeDText;
