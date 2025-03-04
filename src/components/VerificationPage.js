// VerificationPage.js
import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import VeratadResult from './VeratadResult';
import { Grid, Paper, CircularProgress, Typography, IconButton,Box } from '@mui/material';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back arrow icon

function VerificationPage() {
  const [showResult, setShowResult] = useState(false);
  const isLoading = useSelector((state) => state.other.isLoading);
  const licensePreview = useSelector((state) => state.other.licensePreview);
  const barcodePreview = useSelector((state) => state.other.barcodePreview);
  const veratadData = useSelector((state) => state.other.veratadData);

  useEffect(() => {
    console.log('VerificationPage Rendered');
  },);

  useEffect(() => {
    if (isLoading) {
      console.log('Loading...');
    } else {
      console.log('Loading finished');
    }
  }, [isLoading]);

  useEffect(() => {
    console.log('Veratad Data Updated:', veratadData);
  }, [veratadData]);

  const handleFileUploadSubmit = () => {
    setShowResult(true);
    console.log('showResult updated to:', showResult);
  };

  const handleGoBack = () => {
    setShowResult(false); // Go back to FileUpload
  };

  
  console.log('isLoading', isLoading);
  return (
    <Grid container justifyContent="center" spacing={2} style={{ padding: '20px' }}>
      <Grid item xs={12} md={10}> {/* Updated grid size */}
        <Paper elevation={3} style={{ padding: '20px' }}>
          {isLoading ? (
            <CircularProgress />
          ) : !showResult ? (
            <FileUpload onSubmit={handleFileUploadSubmit} />
          ) : (
            <div>
              <Box display="flex" alignItems="center" style={{ backgroundColor: 'lightgray', padding: '10px' }}> {/* Added Box for styling */}
                <IconButton onClick={handleGoBack} style={{ marginRight: '10px' }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">
                  Verify Consumer Info
                </Typography>
              </Box>

              <Box display="flex" justifyContent="center" style={{ backgroundColor: '#585353', padding: '10px' }}> {/* Added justifyContent */}
                {licensePreview && (
                  <img
                    src={licensePreview}
                    alt="License Preview"
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                  />
                )}
                {barcodePreview && (
                  <img
                    src={barcodePreview}
                    alt="Barcode Preview"
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                  />
                )}
              </Box>
              <VeratadResult />
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default VerificationPage;