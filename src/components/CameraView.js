import React, { useState, useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import './CameraCapture.css';

function CameraView({ cameraStarted }) {
  const [facingMode, setFacingMode] = useState('user'); // Default to user (front)
  const videoRef = useRef(null);

  const handleFlipCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'user' ? 'environment' : 'user'
    );
  };

  useEffect(() => {
    let stream;
    const startCamera = async () => {
      try {
        const constraints = {
          video: { facingMode: facingMode },
          audio: false,
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    if (cameraStarted) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStarted, facingMode]);

  return (
    <div className="camera-view-container">
      {cameraStarted && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
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