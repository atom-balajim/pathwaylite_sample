// src/components/CameraView.js
import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import './CameraCapture.css';

function CameraView({ cameraStarted }) {
  const [facingMode, setFacingMode] = useState('environment');

  const handleFlipCamera = () => {
    setFacingMode(prevFacingMode =>
      prevFacingMode === 'user' ? 'environment' : 'user'
    );
  };

  const videoConstraints = {
    facingMode: facingMode
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        console.log('Camera access granted!');
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }, []);

  return (
    <div className="camera-view-container">
      {cameraStarted && (
        <>
          <Webcam
            audio={false}
            videoConstraints={videoConstraints}
            mirrored={facingMode === 'user'}
            style={{ maxWidth: '100%', maxHeight: '80vh' }} // Add these styles
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