import React from 'react';
import { Paper, TextField, Button, Grid, Box } from '@mui/material';
import { primaryColor, secondaryColor } from '../config/constants';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google';
import rippleTop from '../assets/rippleTop.png';
import rippleBottom from '../assets/rippleBottom.png';
import Divider from '@mui/material/Divider';

const styles = {
    container: {
      position: 'relative',
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      minHeight:"100vh"
    },
    backgroundImage1: {
      position: 'absolute',
      zIndex: -1,
      bottom: 0,
      left: 0,
      width: '45%',
      height: '65%',
    // width: '60%',
    // height: 'auto',
    // left: '-94px',
    // top: '288px'
    },
    backgroundImage2: {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      right: 0,
      width: '30%',
      height: '55%'
    // width: '60%',
    // height: 'auto',
    // left: '906px',
    // top: '-58px',
    },
    label: {
        textAlign: 'left',
        marginBottom: '4px',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        lineHeight: '1.57',
        color: '#363636',
        margin: '2px',
    },
    input: {
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '24px',
        '&:focus': {
          borderColor: '#4507FE',
        },
      },
  };

function SignUpPage() {
  
  return (
    <Box 
    sx={styles.container}
    >
        <img src={rippleTop} alt="background image 1" style={styles.backgroundImage1} />
        <img src={rippleBottom} alt="background image 2" style={styles.backgroundImage2} />
        <Grid container justifyContent="center"  >
        <Grid item xs={12} sm={8} md={6}>
            <Paper
            elevation={3}
            sx={{
                paddingY: 3,
                textAlign: 'center',
                margin: '0 auto',
                width: 'auto',
                height: 'auto',
                paddingX: 20,
                // apply 100% width on mobile
                "@media (max-width: 1599.95px)": {
                    paddingX: 3,
                },
            }}
            >
            <h2>Create Account</h2>
            <form
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label htmlFor="email" style={styles.label}>
                    Email
                    </label>
                    <TextField
                    id="email"
                    variant="outlined"
                    InputProps={{
                        startAdornment: <MailOutlineIcon color="action" fontSize="small" />,
                    }}
                    fullWidth
                    sx={{
                        marginBottom: 2,
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4507FE"
                        }
                      }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <TextField
                  id="password"
                  variant="outlined"
                  type="password"
                  InputProps={{
                    startAdornment: <LockOpenIcon color="action" fontSize="small" />,
                  }}
                  fullWidth
                  sx={{
                    marginBottom: 2,
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4507FE"
                    }
                  }}
                />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label htmlFor="password" style={styles.label}>
                  Confirm Password
                </label>
                <TextField
                  id="password"
                  variant="outlined"
                  type="password"
                  InputProps={{
                    startAdornment: <LockOpenIcon color="action" fontSize="small" />,
                  }}
                  fullWidth
                  sx={{
                    marginBottom: 2,
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4507FE"
                    },
                  }}
                />
                </Box>
                <Button
                variant="contained"
                fullWidth
                sx={{ 
                    marginBottom: 2,
                    backgroundColor: primaryColor,
                    textTransform: 'None',
                    ":hover": {
                        backgroundColor : secondaryColor
                    }
                }}
                >
                Create Account
                </Button>
                <Divider> or </Divider>
                <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                fullWidth
                sx={{
                    marginBottom: 2,
                    marginTop: 2,
                    backgroundColor: 'common.white',
                    color: 'common.black',
                    textTransform: 'none',
                    '&:hover': {
                    backgroundColor: 'common.black',
                    color: 'common.white',
                   
                    },
                }}
                >
                Sign up with Google
                </Button>
                <p>
                Already have an account?{' '}
                <a href="#" style={{ color: '#3f51b5' }}>
                    Log in now
                </a>
                </p>
            </form>
            </Paper>
        </Grid>
        </Grid>
    </Box>
  );
}

export default SignUpPage;
