// src/components/CameraView.js
import React, { useRef, useCallback } from 'react';
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

function CameraView({ cameraStarted, videoRef }) {
  const [facingMode, setFacingMode] = React.useState('user');

  const handleFlipCamera = useCallback(async () => {
    if (!cameraStarted) return;

    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: newFacingMode },
    });
    videoRef.current.srcObject = stream;
  }, [cameraStarted, facingMode, videoRef]);

  return (
    <>
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
            zIndex: 10,
          }}
        >
          <FlipCameraAndroidIcon />
        </IconButton>
      )}
    </>
  );
}

export default CameraView;