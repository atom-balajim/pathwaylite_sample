import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import './CameraCapture.css';

function CameraView({ cameraStarted }) {
  const [facingMode, setFacingMode] = useState(null);

  const handleFlipCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'user' ? { exact: 'environment' } : 'user'
    );
  };

  const videoConstraints = {
    facingMode: facingMode,
  };

  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const rearCamera = devices.find(
          (device) =>
            device.kind === 'videoinput' &&
            (device.label.toLowerCase().includes('rear') ||
              device.label.toLowerCase().includes('back') ||
              device.label.toLowerCase().includes('environment'))
        );
        if (rearCamera) {
          setFacingMode({ exact: rearCamera.deviceId });
        } else {
          setFacingMode('user');
        }
      } catch (error) {
        console.error('Error getting camera devices:', error);
        setFacingMode('user'); // Default to user if error occurs
      }
    };

    getCameras();

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        console.log('Camera access granted!');
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  }, []);

  console.log('Current facingMode:', facingMode);

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