import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
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
      'a-nft': any
      'a-cursor': any
      'a-gui-flex-container': any
      'a-gui-cursor': any
    }
  }
}

// Props used for StepData and Scene setup
interface MarkerEntityProps {
  letsDraw: () => void;
  stepName: string;
  latitude: number;
  longitude: number;
  // position?: [number, number, number];
  // text?: string;
  // rotation?: [number, number, number];
}
  // Geolocate Marker type scene taking in stepData name and coordinates
const MarkerEntity: React.FC<MarkerEntityProps> = ({  stepName, latitude, longitude, letsDraw }) => {

  const markerRef = useRef<any>(null);


  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setAttribute('animation', 'property: scale; to: 1.8 2 1.9; dir: alternate; loop: false')
    }
  }, []);

  return (
    <div>
    <a-scene
      camera
      isMobile
      embedded
      // arjs="sourceType: webcam; debugUIEnabled: false;"
      //vr-mode-ui="enabled: false"
      >

  <a-camera>
  {/* <a-cursor
      cursor="fuse: true; fuseTimeout: 5000"
      position="0 0 -1"
      geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
      material="color: red; shader: flat">
    </a-cursor> */}
    <a-gui-cursor
              id="cursor"
						  // raycaster="objects: [gui-interactable]"
						  fuse="true"
               fuse-timeout="5000"
						  color="#ECEFF1"
						  hover-color="#CFD8DC"
						  active-color="red"
						  design="reticle"
     >
    </a-gui-cursor>
  </a-camera>

    <a-entity
      ref={markerRef}
      gps-entity-place={`latitude: ${latitude}; longitude: ${longitude};`}
      id="marker"
      position={`0 4 -5`}
      animation="property: scale; to: 1.8 2 1.9; dir: alternate; loop: false"
      geometry="primitive: plane; width: 2; height: 0.7"
      material="color: yellow; transparent: true; opacity: 0.9"
      text={`value: ${stepName}; width: 3; align: center; zOffset: 0.1; color: #000000`}
      onClick={letsDraw}/>
   </a-scene>
    <video id="video"></video>
   </div>
  );
};

export default MarkerEntity;
