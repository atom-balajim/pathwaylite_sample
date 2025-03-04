// src/components/WelcomePage.js
import React, { useState } from 'react';
import { Button, Typography, Grid, Paper, Box,Divider , FormControl,
    InputAdornment,NativeSelect, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import the icon
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Import calendar icon
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import time icon
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

function WelcomePage() {
  const navigate = useNavigate(); // Initialize navigate
  const [engagementType, setEngagementType] = useState('Consumer Engagement'); // State for dropdown
  const [dateOfBirth, setDateOfBirth] = useState(''); // State for Date of Birth
  const [idExpiration, setIdExpiration] = useState(''); // State for ID Expiration


  const handleScanClick = () => {
    navigate('/camera'); // Navigate to the CameraCapture route
  };

  const handleEngagementTypeChange = (event) => {
    setEngagementType(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleIdExpirationChange = (event) => {
    setIdExpiration(event.target.value);
  };

  
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} md={8} >
        <Paper elevation={3} style={{ padding: '20px', backgroundColor:"#fffefe" }}>
        <Box  marginBottom={2}>
            <Grid container> {/* Use Grid for layout */}
              <Grid item xs={1} style={{display:"flex", justifyContent:"right", alignItems:'center', paddingRight:"2px"}}> {/* Left side for the icon */}
                <LocationOnIcon style={{ color: '#FFA500' }}/>
              </Grid>
              <Grid item xs={11}> {/* Right side for the text */}
              <Typography variant="h5">Sidelines Grille</Typography>
              <Typography variant="subtitle1">#530112 - Retail</Typography>
                <Typography variant="body2">3466 Cobb Pkwy NW, Acworth, GA 30101</Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} /> {/* Divider with shadow */}
          <Box marginBottom={4}>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" align="right">Engagement Type</Typography>
                <FormControl fullWidth>
                  
                  <NativeSelect
                    id="engagement-type-native"
                    value={engagementType}
                    onChange={handleEngagementTypeChange}
                    inputProps={{
                      name: 'engagementType',
                      id: 'engagement-type-native',
                    }}
                    style={{ border: 'none', outline: 'none' }} // Remove borders and outline
                  >
                    <option value="Consumer Engagement">Consumer Engagement</option>
                    {/* Add more menu items as needed */}
                  </NativeSelect>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h6">Verify Consumer Eligibility</Typography>
          </Box>

          <Box textAlign="center" marginBottom={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleScanClick}
              size="large"
              startIcon={<QrCodeScannerIcon />}
            >
              Scan Driver's License or State ID
            </Button>
          </Box>

          <Box textAlign="center" marginBottom={2}>
            <Typography>OR</Typography>
          </Box>

          <Box textAlign="center" marginBottom={2}>
            <Typography>Enter the consumer's date of birth and ID expiration.</Typography>
          </Box>

          <Grid container spacing={2} justifyContent="center" marginBottom={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date-of-birth"
                label="Date of Birth"
                type="date"
                variant="filled"
                fullWidth
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                InputProps={{
                  startAdornment: ( // Use startAdornment for left side
                    <InputAdornment position="start">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="id-expiration"
                label="ID Expiration"
                type="date"
                variant="filled"
                fullWidth
                value={idExpiration}
                onChange={handleIdExpirationChange}
                InputProps={{
                  startAdornment: ( // Use startAdornment for left side
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>


          <Box textAlign="center">
            <Button variant="contained" color="primary">Next</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default WelcomePage;