// src/components/CameraCapture.js
import React, { useState, useCallback, useRef } from 'react';
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
  Button,
  CircularProgress,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VeratadResult from './VeratadResult';
import ImagePreview from './ImagePreview';
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
  const dispatch = useDispatch();
  const capturedImage = useSelector((state) => state.other.capturedImage);
  const [openDialog, setOpenDialog] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [showVeratadResult, setShowVeratadResult] = useState(false);
  const [forceUpdate1, forceUpdate] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const videoRef = useRef(null);

  console.log("forceUpdate1", forceUpdate1);

  const handleStartCamera = useCallback(async () => {
    dispatch(startCamera());
    setCameraStarted(true);
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Set facingMode to 'environment'
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Handle the error, e.g., display an error message to the user
    }
  }, [dispatch]);

  const handleCaptureImage = useCallback(() => {
    if (cameraStarted && videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg');

      dispatch(captureImage(imageDataUrl));
      forceUpdate({});
      setIsImageCaptured(true);
      setImagePreview(imageDataUrl);
    }
  }, [cameraStarted, dispatch,videoRef]);

  const handleRetake = useCallback(() => {
    setImagePreview(null);
    setIsImageCaptured(false);
    setCameraStarted(false);
  },);

  const handleSubmit = async () => {
    console.log("capturedImage:", capturedImage);

    if (!capturedImage) {
      console.error("No image captured");
      return;
    }

    setIsLoading(true); // Set isLoading to true
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
      console.log("OCR response:", response);

      if (response === undefined) {
        throw new Error('OCR Scan not work offline');
      }
      dispatch(veratadSuccess(response.data));
      console.log("Veratad success dispatched");
      setShowVeratadResult(true);
    } catch (error) {
      console.error("OCR error:", error);
      dispatch(veratadFailure(error.message || 'Error processing OCR data'));
      console.log("Veratad failure dispatched");
    } finally {
      setIsLoading(false); // Set isLoading to false in finally
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
                  <div>
                    <video ref={videoRef} autoPlay />
                  </div>
                )}

                <div>
                  {!isImageCaptured && cameraStarted && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCaptureImage}
                      style={{ marginTop: '16px' }}
                    >
                      Capture Image
                    </Button>
                  )}
                  {isImageCaptured && (
                    <div style={{ marginTop: '16px' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRetake}
                        style={{ marginRight: '8px' }}
                      >
                        Retake
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={isLoading} // Disable button while loading
                      >
                        {isLoading ? ( // Show loading indicator
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </div>
                  )}
                  {!cameraStarted && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleStartCamera}
                      style={{ marginTop: '16px' }}
                    >
                      Start Camera
                    </Button>
                  )}
                </div>
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