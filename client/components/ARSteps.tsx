import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { StepProgressType } from '@this/types/StepProgress';

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
  step: StepProgressType
  setImage: (image: string | null | ArrayBuffer) => void;
  setInProgress: (inProgress: boolean) => void;
  setSizeWarning: (sizeWarning: boolean) => void;
  giveStepsTakenAchievement: () => void;
  // position?: [number, number, number];
  // text?: string;
  // rotation?: [number, number, number];
}
  // Geolocate Marker type scene taking in stepData name and coordinates
const MarkerEntity: React.FC<MarkerEntityProps> = ({ step, setImage, setInProgress, setSizeWarning,giveStepsTakenAchievement}) => {

  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [stepName, setStepName] = useState<string | null> (null);
  const [tracks, setTracks] = useState<MediaStreamTrack | null> (null);



  const letsDraw = async() => {
    const reader = await new FileReader()
    try{
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: {
          facingMode: "environment",
        }, audio: false })
        .then((stream) => {
          const track = stream.getVideoTracks()[0];
          setTracks(track);
          return new (window as any).ImageCapture(track);
        })
        .then((imageCapture) => imageCapture.takePhoto())
        .then((blob) => {
            reader.addEventListener('load', async(event) => {
              setImageSrc(event.target.result)
            })
            reader.readAsDataURL(blob);
        })
    }}
    catch(error) {console.error('could not stream', error)}
  }


  useEffect(() => {
    setLatitude(step.step.latitude)
    setLongitude(step.step.longitude)
    setStepName(step.step.name)
  }, [])

  useEffect(() => {
    if(imageSrc !== null) {
          // use this once you have an image
      axios.post(`/cloud/stepProgress/${step.id}`, {data: imageSrc})
        .then((response) => {
          axios.put(`/step/progress/${step.id}`, {
            in_progress: false,
            image_url: response.data.secure_url
          })
          console.log(response.data.secure_url)
          setImage(response.data.secure_url)
          setInProgress(false);
          giveStepsTakenAchievement();
        })
        .then(() => {
          tracks.stop();
          document.exitFullscreen();
        })
        .catch((error) => {
          console.error('could not post to stepProgress', error)
          setSizeWarning(true);
        })
    }
  }, [imageSrc])

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
                  design="reticle"
                  >
        </a-gui-cursor>
        {/* <a-cursor
          fuse="true"
          fuse-timeout="1000"
          color="red"
          geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
          material="color: red; shader: flat"
        /> */}
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
        onClick={letsDraw}
        />

      <a-image
        src={logo}
        width="0.3"
        height="0.3"
        position="0 1.6 -4"
        //onClick={letsDraw}
        />

      <a-plane
    width="3.5"
    height="1.9"
    color="#835500"
    position="0 2.1 -6" >
    </a-plane>

   </a-scene>
   </div>
  );
};

export default MarkerEntity;
