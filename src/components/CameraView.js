// src/components/CameraView.js
import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

function CameraView({ cameraStarted, videoRef }) {
  const [facingMode, setFacingMode] = React.useState('environment'); // Default to rear camera

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
      // Handle the error, e.g., display an error message to the user
    }
  }, [cameraStarted, facingMode, videoRef]);

  return (
    <div style={{ position: 'relative' }}> {/* Add a container for positioning */}
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
            zIndex: 100, // Increase z-index
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Add background color for visibility
            padding: '8px', // Add some padding
          }}
        >
          <FlipCameraAndroidIcon />
        </IconButton>
      )}
      {newFacingMode}
    </div>
  );
}

export default CameraView;