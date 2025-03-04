// src/components/CameraView.js
import React from 'react';

function CameraView({ videoRef }) {
  return (
    <video ref={videoRef} autoPlay playsInline className="camera-view-video" />
  );
}


export default CameraView;