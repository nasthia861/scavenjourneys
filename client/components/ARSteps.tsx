import React, { useRef, useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-entity': any
      'a-scene': any;
      'a-marker': any;
      'a-text': any;
      'a-camera': any;
      'a-camera-static': any;
      'a-assets': any;
      'a-asset-item': any
      'a-mixin': any
      'a-circle': any
      'a-sky': any
    }
  }
}

interface MarkerEntityProps {
  stepName: string;
  position?: [number, number, number];
  text?: string;
  rotation?: [number, number, number];
}

const MarkerEntity: React.FC<MarkerEntityProps> = ({
  stepName
}) => {
  return (
    <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
    <a-marker preset="hiro">

    </a-marker>

    {/* Your 3D models,*/}
    <a-entity
      id="marker"
      position={`0 4 -5`}
      animation="property: scale; to: 1.8 2 1.9; dir: alternate; loop: false"
      geometry="primitive: plane; width: 2; height: 0.7"
      material="color: white; transparent: true; opacity: 0.9"
      text={`value: ${stepName}; width: 3; align: center; zOffset: 0.1; color: #000000`}
    />
  </a-scene>
  );
};

export default MarkerEntity;
