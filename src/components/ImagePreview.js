// ImagePreview.js
import React from 'react';
import { Box, Button, Grid } from '@mui/material';

function ImagePreview({ imagePreview, handleRetake }) {
  return (
    <div style={{ marginBottom: '10px'}}>
      <Box display="flex" justifyContent="center">
        <img src={imagePreview} alt="Captured Preview" className="image-preview-img" style={{ maxWidth: '100%', maxHeight: '40vh' }} />
      </Box>
      <Grid container spacing={2} className="image-preview-retake" style={{ width:"100%", display:"flex", justifyContent:"center", paddingLeft:"16px", marginTop:"10px" }}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={handleRetake} fullWidth style={{ color: '#fff' }}>
            Retake
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ImagePreview;