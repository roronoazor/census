import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { primaryColor, secondaryColor } from '../config/constants';
import { Container } from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router';

const Header = (props) => {
    const { authenticated, data } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const moveToLoginPage = () => {
      navigate('/auth/login');
    }

    const moveToSignupPage = () => {
      navigate('/auth/signup');
    }

    const logout = () => {
      localStorage.clear();
      window.location.reload();
    }

    const moveToRegistrationPage = () => {
      navigate('/account/register');
    }
  
    return (
      <Box sx={{ borderBottom: '1px solid #D1D1D1' }}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Counter
            </Typography>
            <Stack direction="row" spacing={2}>

              {
                data?.token ? 
                (
                  <>
                    <Button
                      variant="outlined"
                      onClick={moveToRegistrationPage}
                      sx={{
                        height: '40px',
                        width: '230px',
                        color: primaryColor,
                        borderColor: primaryColor,
                        textTransform: 'none',
                        display: { xs: 'none', md: 'block' }, // hide on mobile devices
                      }}
                    >
                      Register
                    </Button>
                    <Button
                    variant="contained"
                    onClick={logout}
                    sx={{
                      height: '40px',
                      width: '230px',
                      color: '#fff',
                      backgroundColor: primaryColor,
                      textTransform: 'none',
                      display: { xs: 'none', md: 'block' }, // hide on mobile devices
                    }}
                  >
                    Log out
                  </Button>
                  </>
                ) :
                (
                  <>
                  <Button
                    variant="outlined"
                    onClick={moveToLoginPage}
                    sx={{
                      height: '40px',
                      width: '230px',
                      color: primaryColor,
                      borderColor: primaryColor,
                      textTransform: 'none',
                      display: { xs: 'none', md: 'block' }, // hide on mobile devices
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    variant="contained"
                    onClick={moveToSignupPage}
                    sx={{
                      height: '40px',
                      width: '230px',
                      color: '#fff',
                      backgroundColor: primaryColor,
                      textTransform: 'none',
                      display: { xs: 'none', md: 'block' }, // hide on mobile devices
                    }}
                  >
                    Sign Up
                  </Button>
                  </>
                )
              }
             
              {/* Hamburger menu for mobile devices */}
              <IconButton
                size="large"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ display: { xs: 'flex', md: 'none' } }} // show on mobile devices only
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {
                  data?.token ? (
                    <Box>
                      <MenuItem onClick={moveToRegistrationPage}>Register</MenuItem>
                      <MenuItem onClick={logout}>Log out</MenuItem>
                    </Box>
                    
                  ) : (
                    <Box>
                      <MenuItem onClick={moveToLoginPage}>Log in</MenuItem>
                      <MenuItem onClick={moveToSignupPage}>Sign up</MenuItem>    
                    </Box>
                  )
                }
                
              </Menu>
            </Stack>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default Header;