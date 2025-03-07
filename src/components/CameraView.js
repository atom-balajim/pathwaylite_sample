// CameraView.js
import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import './CameraCapture.css';

function CameraView({ cameraStarted, onCapture }) {
  const [facingMode, setFacingMode] = useState('environment');

  const handleTakePhoto = (dataUri) => {
    onCapture(dataUri);
  };

  const handleFlipCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'user' ? 'environment' : 'user'
    );
  };

  return (
    <div className="camera-view-container">
      {cameraStarted && (
        <>
          <Camera
            onTakePhoto={handleTakePhoto}
            idealFacingMode={facingMode}
            isImageMirror={facingMode === 'user'}
            style={{ maxWidth: '100%', maxHeight: '60vh' }}
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