// src/components/CameraCapture.js
import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startCamera,
  captureImage,
  sendVeratad,
  veratadSuccess,
  veratadFailure,
} from '../redux/actions';
import OcrService, { IdType } from './OcrService';
import { getOcrServiceData } from '../services/EnvironmentConfigService';
import {
  Grid,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VeratadResult from './VeratadResult';
import CameraView from './CameraView';
import ImagePreview from './ImagePreview';
import ActionButtons from './ActionButtons';
import CameraDialog from './CameraDialog';
import './CameraCapture.css';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#FFA500',
    },
  },
});

function CameraCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const capturedImage = useSelector((state) => state.other.capturedImage);
  const [openDialog, setOpenDialog] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [showVeratadResult, setShowVeratadResult] = useState(false);
  const [forceUpdate1, forceUpdate] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  console.log("forceUpdate1", forceUpdate1);

  const handleStartCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        dispatch(startCamera());
        setCameraStarted(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setOpenDialog(true);
    }
  }, [dispatch]); // Added dispatch to dependency array

  const handleCaptureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
      dispatch(captureImage(imageDataUrl));
      forceUpdate({});
      setIsImageCaptured(true);
      setImagePreview(imageDataUrl);
    }
  }, [videoRef, canvasRef]); // Added dependency array

  const handleRetake = useCallback(async () => {
    setImagePreview(null);
    setIsImageCaptured(false);
    setCameraStarted(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStarted(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setOpenDialog(true);
    }
  },); // No dependencies needed here

  const handleSubmit = async () => {
    dispatch(sendVeratad(capturedImage));
    try {
      const ocrService = new OcrService(getOcrServiceData());
      let licenseBase64 = capturedImage
        ? capturedImage.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
        : '';
      if (licenseBase64 === capturedImage) {
        console.error("Regex replace failed");
      }
      const response = await ocrService.CallOcr(licenseBase64, '', IdType.LICENSE);
      if (response === undefined) {
        throw new Error('OCR Scan not work offline');
      }
      dispatch(veratadSuccess(response.data));
      setShowVeratadResult(true);
    } catch (error) {
      dispatch(veratadFailure(error.message || 'Error processing OCR data'));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" spacing={2} className="camera-capture-container">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="camera-capture-paper">
            <Typography variant="h6" gutterBottom className="camera-capture-header">
              <CameraAltIcon className="camera-capture-icon" />
              Camera Capture
            </Typography>

            {showVeratadResult ? (
              <VeratadResult capturedImage={capturedImage} onBack={() => setShowVeratadResult(false)} />
            ) : (
              <div style={{ textAlign: 'center' }}>
                {imagePreview ? (
                  <ImagePreview imagePreview={imagePreview} handleRetake={handleRetake} />
                ) : (
                  <CameraView videoRef={videoRef} cameraStarted={cameraStarted} />
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <ActionButtons
                  imagePreview={imagePreview}
                  cameraStarted={cameraStarted}
                  handleStartCamera={handleStartCamera}
                  handleCaptureImage={handleCaptureImage}
                  handleSubmit={handleSubmit}
                  isImageCaptured={isImageCaptured}
                />
              </div>
            )}
          </Paper>
        </Grid>

        <CameraDialog open={openDialog} onClose={handleCloseDialog} />
      </Grid>
    </ThemeProvider>
  );
}

export default CameraCapture;