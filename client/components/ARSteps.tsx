import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { StepProgressType } from '@this/types/StepProgress';

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
  userId: number
  step: StepProgressType
  setImage: (image: string | null | ArrayBuffer) => void;
  setInProgress: (inProgress: boolean) => void;
  // position?: [number, number, number];
  // text?: string;
  // rotation?: [number, number, number];
}
  // Geolocate Marker type scene taking in stepData name and coordinates
const MarkerEntity: React.FC<MarkerEntityProps> = ({ userId, step, setImage, setInProgress }) => {

  const canvas = useRef(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [journeyProgressId, setJourneyProgressId] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [stepName, setStepName] = useState<string | null> (null);
  const [tracks, setTracks] = useState<MediaStreamTrack | null> (null);



  const letsDraw = () => {
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
        .then((blob) => createImageBitmap(blob))
        .then((imageBitmap) => {
          const ctx = canvas.current.getContext('2d');
          ctx.drawImage(imageBitmap, 0, 0, 400, 300);
          const data = canvas.current.toDataURL("image/png");
          setImageSrc(data)
        })
    }}
    catch(error) {console.error('could not stream', error)}
  }


  useEffect(() => {
    setJourneyProgressId(step.journey_progress.id)
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
          setImage(response.data.secure_url)
          setInProgress(false);
        })
        .then(() => {
          tracks.stop();
          document.exitFullscreen();
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
      <canvas
        hidden
        ref={canvas}
              />
    <a-scene
      camera
      isMobile
      embedded
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
        onClick={letsDraw}/>
    </a-scene>
    </div>
  );
};

export default MarkerEntity;
