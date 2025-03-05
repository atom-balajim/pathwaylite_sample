// src/components/CameraCapture.js
import React, { useState, useCallback } from 'react';
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
    dispatch(startCamera());
    setCameraStarted(true);
  }, [dispatch]);

  const handleCaptureImage = useCallback(() => {
    if (cameraStarted) {
      // Assuming CameraView now uses react-webcam, the capture is handled within.
      // We just need to trigger the capture and set the imagePreview.
      const webcam = document.querySelector('video'); // Select the video element from react-webcam
      if (webcam) {
        const canvas = document.createElement('canvas');
        canvas.width = webcam.videoWidth;
        canvas.height = webcam.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(webcam, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');

        dispatch(captureImage(imageDataUrl));
        forceUpdate({});
        setIsImageCaptured(true);
        setImagePreview(imageDataUrl);
      }
    }
  }, [cameraStarted, dispatch]);

  const handleRetake = useCallback(() => {
    setImagePreview(null);
    setIsImageCaptured(false);
    setCameraStarted(false);
  }, []);

  const handleSubmit = async () => {
    console.log("capturedImage:", capturedImage); // Log the captured image
  
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
      console.log("OCR response:", response); // Log the OCR response
  
      if (response === undefined) {
        throw new Error('OCR Scan not work offline');
      }
      dispatch(veratadSuccess(response.data));
      console.log("Veratad success dispatched"); // Log dispatch action
      setShowVeratadResult(true);
    } catch (error) {
      console.error("OCR error:", error); // Log any errors
      dispatch(veratadFailure(error.message || 'Error processing OCR data'));
      console.log("Veratad failure dispatched"); // Log dispatch action
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
                  <CameraView cameraStarted={cameraStarted} />
                )}
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