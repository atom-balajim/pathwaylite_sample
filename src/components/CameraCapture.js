import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startCamera,
  captureImage,
  sendVeratad,
  veratadSuccess,
  veratadFailure,
} from '../redux/actions';
import {
  Grid,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VeratadResult from './VeratadResult';
import ImagePreview from './ImagePreview';
import CameraView from './CameraView';
import CameraDialog from './CameraDialog';
import ActionButtons from './ActionButtons';
import './CameraCapture.css';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#FFA500',
    },
  },
});

const hardcodedOcrResponse = {
  meta: {
    confirmation: 190220912,
    timestamp: '2025-03-06 09:46:19',
    reference: null,
    user: 'wsibm@rjrt.com',
    company: 'RJ Reynolds American Inc.',
    service: 'DCAMSPLUS5.0.TEST',
  },
  output: {
    documents: {
      FirstName: 'SANTOSH',
      LastName: 'PATIL',
      MiddleName: '',
      FullName: '',
      Address: '17264 NE 8TH ST APT A',
      City: 'BELLEVUE',
      State: 'WA',
      Zip: '980084145',
      CountryCode: 'US',
      FullAddress: '',
      DateOfBirth: '19800511',
      Height: '068 in',
      Sex: 'M',
      EyeColor: 'BRO',
      DocumentNumber: 'WDL65TS2443B',
      DocumentType: 'DRIVERS LICENSE',
      SourceDocumentType: '',
      IssueDate: '20200814',
      ExpirationDate: '20260511',
    },
  },
  result: {
    action: 'FAIL',
    detail: 'DOCUMENT AGE CHECK FAILED',
    issues:[],
  },
};

function CameraCapture() {
  const dispatch = useDispatch();
  const capturedImage = useSelector((state) => state.other.capturedImage);
  const [openDialog, setOpenDialog] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [showVeratadResult, setShowVeratadResult] = useState(false);
  const [forceUpdate1, forceUpdate] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  console.log('forceUpdate1', forceUpdate1);

  const handleStartCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera access granted!', stream);
      dispatch(startCamera());
      setCameraStarted(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }, [dispatch]);

  const handleCaptureImage = () => {
    if (cameraStarted) {
      const webcam = document.querySelector('video');
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

        handleSubmit();
      }
    }
  };

  const handleRetake = () => {
    setImagePreview(null);
    setIsImageCaptured(false);
    setCameraStarted(false);
  };

  const handleSubmit = async () => {
    console.log('capturedImage:', capturedImage);
    dispatch(sendVeratad(capturedImage));
    try {
      const response = hardcodedOcrResponse; // Using hardcoded response
      dispatch(veratadSuccess(response));
      console.log('Veratad success dispatched');
      setShowVeratadResult(true);
    } catch (error) {
      console.error('OCR error:', error);
      dispatch(
        veratadFailure(error.message || 'Error processing OCR data')
      );
      console.log('Veratad failure dispatched');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        className="camera-capture-container"
      >
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="camera-capture-paper">
            <Typography
              variant="h6"
              gutterBottom
              className="camera-capture-header"
            >
              <CameraAltIcon className="camera-capture-icon" />
              Camera Capture
            </Typography>

            {showVeratadResult ? (
              <VeratadResult
                capturedImage={capturedImage}
                onBack={() => setShowVeratadResult(false)}
              />
            ) : (
              <div style={{ textAlign: 'center' }}>
                {imagePreview ? (
                  <ImagePreview
                    imagePreview={imagePreview}
                    handleRetake={handleRetake}
                  />
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