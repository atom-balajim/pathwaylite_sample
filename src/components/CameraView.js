// src/components/CameraView.js
import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

function CameraView({ cameraStarted, videoRef }) {
  const [facingMode, setFacingMode] = React.useState('environment');

  const handleFlipCamera = useCallback(async () => {
    if (!cameraStarted) return;

    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  }, [cameraStarted, facingMode, videoRef]); // Added cameraStarted to the dependency array

  return (
    <div style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-view-video"
      />
      {cameraStarted && (
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
      )}
      {facingMode}
    </div>
  );
}

export default CameraView;