import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../favicon.svg';
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
      'a-plane': any
      'a-image': any
      'a-cursor': any
      'a-gui-flex-container': any
      'a-gui-cursor': any
      'a-gui-icon-label-button': any
      'a-gui-radio': any
      'a-gui-button': any

    }
  }
}

// Props used for StepData and Scene setup
interface MarkerEntityProps {
  letsDraw: () => void;
  stepName: string;
  latitude: number;
  longitude: number;
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
      renderer="antialias: true"

      // arjs="sourceType: webcam; debugUIEnabled: false;"
      //vr-mode-ui="enabled: false"
      >

  <a-camera>
    <a-gui-cursor
              id='cursor'
						  // raycaster="objects: [gui-interactable]"
						  fuse="true"
              fuse-timeout="5000"
						  color="red"
						  hover-color="red"
						  active-color="red"
						  design="reticle">
    </a-gui-cursor>
  </a-camera>
     <a-entity
      ref={markerRef}
      gps-entity-place={
        `latitude: ${latitude};
         longitude: ${longitude};`}
      id="marker"
      position={`0 2 -5`}
      animation="property: scale; to: 1.8 2 1.9; dir: alternate; loop: false"
      geometry="primitive: plane; width: 2; height: 0.7"
      material="color: '#2F0A00'; shader: flat; transparent: true; opacity: 0.7"
      text={`value: ${stepName}; width: 3; align: center; zOffset: 0.1; color: #000000`}
      onClick={letsDraw}/>

      <a-image
      src={logo}
      width="0.3"
      height="0.3"
      position="0 1.7 -5"
      >

      </a-image>

      <a-plane
    width="4.0"
    height="1.6"
    color="#835500"
    position="0 2 -5" ></a-plane>

   </a-scene>
    <video id="video"></video>
   </div>
  );
};

export default MarkerEntity;
