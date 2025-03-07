// ActionButtons.js
import React from 'react';
import { Button, Grid } from '@mui/material';

function ActionButtons({
  imagePreview,
  cameraStarted,
  handleStartCamera,
  handleSubmit,
  isImageCaptured,
}) {
  return (
    <Grid container spacing={2} className="action-buttons-container" style={{ width:"100%", display:"flex", justifyContent:"center", paddingLeft:"16px" }}>
      {imagePreview ? null : (
        <>
          <Grid item xs={6} sm={6}>
            {!cameraStarted && <Button
              variant="contained"
              color="primary"
              onClick={handleStartCamera}
              fullWidth
            >
              {cameraStarted ? 'Restart Camera' : 'Start Camera'}
            </Button>}
          </Grid>

        </>
      )}
      {isImageCaptured && imagePreview && (
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            fullWidth
            className="action-buttons-submit"
          >
            Submit
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default ActionButtons;