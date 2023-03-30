import React from 'react';
import { Paper, TextField, Button, Grid, Box } from '@mui/material';
import { primaryColor, secondaryColor } from '../config/constants';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google';
import rippleTop from '../assets/rippleTop.png';
import rippleBottom from '../assets/rippleBottom.png';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { API_URL } from '../config/constants';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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

function LoginPage() {

  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = React.useState(false);  
  const [message, setMessage] = React.useState('');
  const moveToSignupPage = () => {
    navigate('/auth/signup');
  }

  const handleCloseSnack = () => {
    setOpenSnack(false);
    setMessage('');
  }

  const logIn = async ({ email, password }) => {
      const { data } = await axios.post(`${API_URL}/authentication/login/`, {
        email,
        password,
      });
      return data;
  };

  const [formData, setFormData] = React.useState({ email: '', password: '', rememberMe: false });
  const { mutate, isLoading } = useMutation(logIn, {
    onSuccess: (data) => {
      localStorage.setItem('data', JSON.stringify(data));
      // add any other necessary data to state here
      window.location.reload();
      navigate('/'); // replace this with the URL to redirect the user to after signup
    },
    onError: (error) => {
      setMessage(error?.response?.data?.detail || 'Oops! Something went wrong');
      setOpenSnack(true);
    }
  });

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    
    if (name == 'rememberMe') {
       setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.checked,
      }));
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((!formData.password || !formData.email)){
      setOpenSnack(true);
      setMessage('Please fill all required fields!!!')
      return;
    }
    
    mutate(formData);
  };

  console.log('formData', formData);
  
  return (
    <Box 
    sx={styles.container}
    >
        <img src={rippleTop} alt="background image 1" style={styles.backgroundImage1} />
        <img src={rippleBottom} alt="background image 2" style={styles.backgroundImage2} />
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity="warning" sx={{ width: '100%' }}>
            {message || ''}
          </Alert>
        </Snackbar>
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
            <h2>Log In to Account</h2>
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
                    name="email"
                    variant="outlined"
                    onChange={handleChange}
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
                  name="password"
                  onChange={handleChange}
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
                <FormControlLabel
                style={{ float: "left", marginRight: "10px" }}
                control={
                    <Checkbox
                    onChange={handleChange}
                    checked={formData?.rememberMe}
                    name="rememberMe"
                    color="primary"
                    />
                }
                label="Remember Me"
                />
                <LoadingButton
                variant="contained"
                loading={isLoading}
                fullWidth
                onClick={handleSubmit}
                sx={{ 
                    marginBottom: 2,
                    backgroundColor: primaryColor,
                    textTransform: 'None',
                    ":hover": {
                        backgroundColor : secondaryColor
                    }
                }}
                >
                Log In
                </LoadingButton>
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
                Log in with Google
                </Button>
                <p style={{ color: '#888888' }}>
                Already have an account?{' '}
                <Button sx={{ color: '#000', fontWeight: 'bold' , textDecoration: 'none', textTransform: 'none' }} onClick={moveToSignupPage}>
                    Register Account
                </Button>
                </p>
            </form>
            </Paper>
        </Grid>
        </Grid>
    </Box>
  );
}

export default LoginPage;
