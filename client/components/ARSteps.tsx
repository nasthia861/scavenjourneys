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
const MarkerEntity: React.FC<MarkerEntityProps> = ({  stepName, latitude, longitude, stepData }) => {

  //const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const markerRef = useRef<any>(null);

  const loadAr = async() => {
    // const video = document.querySelector("video");
    // const canvas = document.createElement("canvas");
    // video.pause();

    // let v_width = video.clientWidth*2;
    // let v_height = video.clientHeight*2;

    // canvas.width = v_width;
    // canvas.height = v_height;

    // canvas.getContext('2d').drawImage(video, 0, 0, v_width, v_height)

    const imgData = await document.querySelector('a-scene').components.screenshot.getCanvas('perspective')

    // canvas.getContext('2d').drawImage(imgData, 0, 0, v_width, v_height)





    // use this once you have an image
    // imgData.toBlob((b) => {
    //   const reader = new FileReader()
    //   reader.addEventListener('load', (event) => {
    //     axios.post(`/cloud/stepProgress/${stepData.id}`, {data: event.target.result})
    //       .then((response) => {
    //         axios.put(`/step/progress/${stepData.id}`, {
    //           in_progress: false,
    //           image_url: response.data.secure_url
    //         })
    //       })
    //   });
    //   reader.readAsDataURL(b);
    // })
  }


  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setAttribute('animation', 'property: scale; to: 1.8 2 1.9; dir: alternate; loop: false')
      //loadAr()
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
    <a-cursor
      cursor="fuse: true; fuseTimeout: 5000"
      position="0 0 -1"
      geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
      material="color: red; shader: flat">
    </a-cursor>
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
      onClick={loadAr}/>
   </a-scene>
    <video id="video"></video>
   </div>
  );
};

export default MarkerEntity;
