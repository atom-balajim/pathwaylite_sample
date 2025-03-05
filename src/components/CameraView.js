// src/components/CameraView.js
import React, { useState } from 'react';
import Webcam from "react-webcam";
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

function CameraView({ cameraStarted }) {
  const [facingMode, setFacingMode] = useState('environment');

  // Removed useCallback
  const handleFlipCamera = () => {
    setFacingMode(prevFacingMode =>
      prevFacingMode === 'user' ? 'environment' : 'user'
    );
  };

  const videoConstraints = {
    facingMode: facingMode
  };

  return (
    <div style={{ position: 'relative' }}>
      <h1>{facingMode}</h1>
      {cameraStarted && (
        <>
          <Webcam
            audio={false}
            videoConstraints={videoConstraints}
            mirrored={facingMode === 'user'}
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