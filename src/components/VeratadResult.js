// VeratadResult.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paper, FormGroup, FormControlLabel, Checkbox, IconButton, Typography, Grid, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CakeIcon from '@mui/icons-material/Cake';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon

function VeratadResult({capturedImage, onBack}) {
  const veratadData = useSelector((state) => state.other.veratadData);
  const veratadError = useSelector((state) => state.other.veratadError);

  useEffect(() => {
    console.log('VeratadResult Props:', veratadData, veratadError);
  }, [veratadData, veratadError]);

  if (veratadError) {
    return <div>Error: {veratadError}</div>;
  }

  // Helper function to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}/${month}/${year}`;
  };


  if (veratadData && veratadData.output && veratadData.output.documents) {
    const {
      FirstName,
      LastName,
      CountryCode,
      DocumentNumber,
      DocumentType,
      DateOfBirth,
      IssueDate,
      ExpirationDate,
      Sex,
      Address,
      City,
      State,
      Zip
    } = veratadData.output.documents;

    // Helper function to map Sex values
    const mapSex = (sex) => {
      switch (sex) {
        case 'M':
          return 'Male';
        case 'F':
          return 'Female';
        case 'O':
          return 'Others';
        default:
          return '';
      }
    };

    return (
      <div>
         <Box display="flex" alignItems="center" justifyContent="space-between" style={{ backgroundColor: 'lightgray', padding: '10px' }}>
          <IconButton onClick={onBack} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{textAlign: 'center', flexGrow: 1}}>
            Verify Consumer Info
          </Typography>
          <Box width={48} />
        </Box>
        <Paper elevation={3} style={{ backgroundColor: "#f2f1f00a" }}>
        {capturedImage && (
          <Box display="flex" justifyContent="center" style={{ backgroundColor: '#585353', padding: '10px', marginBottom: '10px' }}>
            <img
              src={capturedImage}
              alt="Captured_Image"
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </Box>
        )}
          <Grid style={{padding:"10px"}}>
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}> {/* Added header */}
            Identification Requirements
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}
                <PersonIcon style={{ marginRight: '8px' }} />
                <TextField
                  id="filled-basic"
                  label="First Name"
                  variant="filled"
                  value={FirstName}
                  fullWidth // Added fullWidth prop
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}
                <TextField
                  id="filled-basic"
                  label="Last Name"
                  variant="filled"
                  value={LastName}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <CakeIcon style={{ marginRight: "8px" }} />
                <TextField
                  id="filled-basic"
                  label="Date Of Birth"
                  variant="filled"
                  value={formatDate(DateOfBirth)}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <CalendarMonthIcon style={{ marginRight: "8px" }} />
                <TextField
                  id="filled-basic"
                  label="Expiration Date"
                  variant="filled"
                  value={formatDate(ExpirationDate)}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}
                <BadgeIcon style={{ marginRight: "8px" }} />
                <TextField
                  id="filled-basic"
                  label="ID Number"
                  variant="filled"
                  value={DocumentNumber}
                  fullWidth
                  InputProps={{
                    readOnly: true,

                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}
                <TextField
                  id="filled-basic"
                  label="Issuing State"
                  variant="filled"
                  value={CountryCode}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}
                <FileCopyIcon style={{ marginRight: '8px' }} />
                <TextField
                  id="filled-basic"
                  label="Document Type"
                  variant="filled"
                  value={DocumentType}
                  fullWidth
                  InputProps={{
                    readOnly: true,

                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <AccessAlarmIcon style={{ marginRight: "8px" }} />
                <TextField
                  id="filled-basic"
                  label="Issue Date"
                  variant="filled"
                  value={formatDate(IssueDate)}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}> {/* Added header */}
                Contact Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}
                <PersonIcon style={{ marginRight: '8px' }} />
                <TextField
                  id="filled-basic"
                  label="Preferred Name"
                  variant="filled"
                  value={FirstName}
                  fullWidth // Added fullWidth prop
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="sex-label">Gender</InputLabel>
                  <Select
                    labelId="sex-label"
                    id="sex-select"
                    value={mapSex(Sex)}
                    readOnly
                  >
                    <MenuItem value={mapSex(Sex)}>{mapSex(Sex)}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}
                <LocationOnIcon style={{ marginRight: '8px' }} />
                <TextField
                  id="filled-basic"
                  label="Address"
                  variant="filled"
                  value={Address}
                  fullWidth // Added fullWidth prop
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}

                <TextField
                  id="filled-basic"
                  label="State"
                  variant="filled"
                  value={State}
                  fullWidth // Added fullWidth prop
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}
                <LocationCityIcon style={{ marginRight: '8px' }} />
                <TextField
                  id="filled-basic"
                  label="City"
                  variant="filled"
                  value={City}
                  fullWidth // Added fullWidth prop
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center"> {/* Added Box for icon placement */}
                <TextField
                  id="filled-basic"
                  label="Zip"
                  variant="filled"
                  value={Zip}
                  fullWidth // Added fullWidth prop
                  InputProps={{
                    readOnly: true,
                  }}
                />
                
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <b>Is this consumer a venue staff member?</b><br />
              <FormGroup>
                <FormControlLabel required control={<Checkbox />} label="yes this consumer is a staff member" />
              </FormGroup>

            </Grid>
          </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }

  return null;
}

export default VeratadResult;