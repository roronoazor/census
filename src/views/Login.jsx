import React from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, TextField, Button, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    maxWidth: 350,
    margin: '0 auto',
    marginTop: theme.spacing(10),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
  googleButton: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  },
  image: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },
  leftImage: {
    left: 0,
  },
  rightImage: {
    right: 0,
  },
}));

function SignUpPage() {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper} elevation={3}>
          <h2>Create Account</h2>
          <form className={classes.form}>
            <TextField
              className={classes.field}
              variant="outlined"
              label="Email"
              InputProps={{
                startAdornment: (
                  <EmailIcon color="action" fontSize="small" />
                ),
              }}
              fullWidth
            />
            <TextField
              className={classes.field}
              variant="outlined"
              type="password"
              label="Password"
              InputProps={{
                startAdornment: (
                  <LockIcon color="action" fontSize="small" />
                ),
              }}
              fullWidth
            />
            <TextField
              className={classes.field}
              variant="outlined"
              type="password"
              label="Confirm Password"
              InputProps={{
                startAdornment: (
                  <LockOpenIcon color="action" fontSize="small" />
                ),
              }}
              fullWidth
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              fullWidth
            >
              Create Account
            </Button>
            <Button
              className={`${classes.button} ${classes.googleButton}`}
              variant="contained"
              startIcon={<GoogleIcon />}
              fullWidth
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
      <img
        className={`${classes.image} ${classes.leftImage}`}
        src="https://via.placeholder.com/150"
        alt=""
      />
      <img
        className={`${classes.image} ${classes.rightImage}`}
        src="https://via.placeholder.com/150"
        alt=""
      />
    </Grid>
  );
}

export default SignUpPage;
