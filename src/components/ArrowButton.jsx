import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import ArrowLeftIcon from '../assets/Vector2.png';
import ArrowRightIcon from '../assets/Vector1.png';
import { primaryColor, secondaryColor } from '../config/constants';


const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 400,
  margin: '0 auto',
  flexDirection: 'row',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
  },
});

const Arrow = styled('img')({
  width: 20,
  height: 20,
  margin: '20px 20px',
});

const CustomButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 50,
  padding: '10px 40px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

function ArrowButton() {
  const sx = {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 400,
      margin: '0 auto',
      flexDirection: 'row',
      '@media (max-width: 600px)': {
        flexDirection: 'column',
      },
    },
    arrow: {
      width: 30,
      height: 30,
      margin: '-20px 10px',
    },
    button: {
      textTransform: 'none',
      borderRadius: 8,
      width: '60%',
      backgroundColor: primaryColor,
      padding: '10px 40px',
      '&:hover': {
        backgroundColor: secondaryColor,
      },
    },
  };

  return (
    <div sx={sx.root}>
      <Arrow sx={sx.arrow} src={ArrowLeftIcon} alt="left arrow" />
      <CustomButton variant="contained" color="primary" sx={sx.button}>
        Register Yourself Now
      </CustomButton>
      <Arrow sx={sx.arrow} src={ArrowRightIcon} alt="right arrow" />
    </div>
  );
}

export default ArrowButton;

