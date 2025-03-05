// src/components/ActionButtons.js
import React from 'react';
import { Button, Grid } from '@mui/material';


function ActionButtons({
  imagePreview,
  cameraStarted,
  handleStartCamera,
  handleCaptureImage,
  handleSubmit,
  isImageCaptured,
}) {
  return (
    <Grid container spacing={2} className="action-buttons-container">
      {imagePreview ? null : (
        <>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={handleStartCamera} fullWidth>
              Start Camera
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCaptureImage}
              fullWidth
              disabled={!cameraStarted}
            >
              Capture Image -1
            </Button>
          </Grid>
        </>
      )}
      {isImageCaptured && imagePreview && (
        <Grid item xs={12}>
          <Button variant="contained" color="success" onClick={handleSubmit} fullWidth className="action-buttons-submit">
            Submit
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default ActionButtons;