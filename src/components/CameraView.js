import React, { useState, useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import './CameraCapture.css';

function CameraView({ cameraStarted }) {
  const [facingMode, setFacingMode] = useState('environment'); // Default to rear
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
        const basicConstraints = {
          video: { facingMode: { exact: facingMode } },
          audio: false,
        };

        stream = await navigator.mediaDevices.getUserMedia(basicConstraints);

        if (stream && stream.getVideoTracks().length > 0 && videoRef.current) {
          videoRef.current.srcObject = stream;

          // Attempt higher resolution (adaptive)
          const highResConstraints = {
            video: { width: 1920, height: 1080, facingMode: { exact: facingMode } },
            audio: false,
          };

          navigator.mediaDevices
            .getUserMedia(highResConstraints)
            .then((highResStream) => {
              if (highResStream && highResStream.getVideoTracks().length > 0 && videoRef.current) {
                videoRef.current.srcObject = highResStream;
                stream.getTracks().forEach((track) => track.stop()); // Stop basic stream
                stream = highResStream; // Update stream reference.
                console.log('High resolution camera stream active.');
              }
            })
            .catch((highResError) => {
              alert(highResError)
              if (highResError.name === 'OverconstrainedError') {
                console.log('High resolution not supported.');
              } else {
                console.error('High resolution error:', highResError);
              }
            });
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('asd',error)
        // Handle error: Display message to user
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