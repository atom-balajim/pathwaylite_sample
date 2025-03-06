// src/components/CameraView.js
import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import './CameraCapture.css';

function CameraView({ cameraStarted }) {
  const [facingMode, setFacingMode] = useState('environment'); // Initial facing mode

  const handleFlipCamera = () => {
    setFacingMode(prevFacingMode =>
      prevFacingMode === 'user' ? 'environment' : 'user'
    );
  };

  const videoConstraints = {
    facingMode: facingMode
  };

  useEffect(() => {
    // Get the initial facing mode from the available cameras
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const rearCamera = devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('rear'));
        if (rearCamera) {
          setFacingMode(rearCamera.deviceId);
        }
      })
      .catch(error => {
        console.error('Error getting camera devices:', error);
      });

    // Request camera access
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        console.log('Camera access granted!');
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  },); // Empty dependency array ensures this runs once

  return (
    <div className="camera-view-container">
      {cameraStarted && (
        <>
          <Webcam
            audio={false}
            videoConstraints={videoConstraints}
            mirrored={facingMode === 'user'}
            style={{ maxWidth: '100%', maxHeight: '80vh' }}
          />
          <IconButton
            onClick={handleFlipCamera}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 100,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: '8px',
            }}
          >
            <FlipCameraAndroidIcon />
          </IconButton>
        </>
      )}
    </div>
  );
}

export default CameraView;