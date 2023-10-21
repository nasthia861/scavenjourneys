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

// Props used for StepData and Scene setup
interface MarkerEntityProps {
  stepName: string;
  latitude: string;
  longitude: string;
  position?: [number, number, number];
  text?: string;
  rotation?: [number, number, number];
}
  // Geolocate Marker type scene taking in stepData name and coordinates
const MarkerEntity: React.FC<MarkerEntityProps> = ({  stepName, latitude, longitude }) => {

    const markerRef = useRef<any>(null);

     useEffect(() => {
      if (markerRef.current) {
      markerRef.current.setAttribute('animation', 'property: scale; to: 1.8 2 1.9; dir: alternate; loop: false');
    }
  }, []);

  return (
    // Scene using webcam or default camera to dynamically render stepData to position at specified coords
    <a-scene gps-camera embedded arjs="sourceType: webcam; debugUIEnabled: false;">
    <a-entity
      ref={markerRef}
      gps-entity-place={`latitude: ${latitude}; longitude: ${longitude};`}
      id="marker"
      position={`0 4 -5`}
      animation="property: scale; to: 1.8 2 1.9; dir: alternate; loop: false"
      geometry="primitive: plane; width: 2; height: 0.7"
      material="color: yellow; transparent: true; opacity: 0.9"
      text={`value: ${stepName}; width: 3; align: center; zOffset: 0.1; color: #000000`}/>
   </a-scene>
  );
};

export default MarkerEntity;
