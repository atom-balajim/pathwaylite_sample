// CameraCapture.js
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
  const [cameraStarted, setCameraStarted] = useState(true);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [showVeratadResult, setShowVeratadResult] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleStartCamera = useCallback(() => {
    dispatch(startCamera());
    setCameraStarted(true);
  }, [dispatch]);

  const handleCapture = (dataUri) => {
    dispatch(captureImage(dataUri));
    setIsImageCaptured(true);
    setImagePreview(dataUri);
    handleSubmit();
  };

  const handleRetake = () => {
    setImagePreview(null);
    setIsImageCaptured(false);
    setCameraStarted(true);
  };

  const handleSubmit = async () => {
    dispatch(sendVeratad(capturedImage));
    try {
      const response = hardcodedOcrResponse;
      dispatch(veratadSuccess(response));
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
              Scan Barcode
            </Typography>

            {showVeratadResult ? (
              <VeratadResult capturedImage={capturedImage} onBack={() => setShowVeratadResult(false)} />
            ) : (
              <div style={{ textAlign: 'center' }}>
                {imagePreview ? (
                  <ImagePreview imagePreview={imagePreview} handleRetake={handleRetake} />
                ) : (
                  <CameraView cameraStarted={cameraStarted} onCapture={handleCapture} />
                )}
                <ActionButtons
                  imagePreview={imagePreview}
                  cameraStarted={cameraStarted}
                  handleStartCamera={handleStartCamera}
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