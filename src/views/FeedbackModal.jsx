import { useState } from 'react';
import { Modal, Backdrop, Box, Button, Typography } from '@mui/material';
import Image from '../assets/Vector.png';
import { primaryColor } from '../config/constants';

const MyModal = ({ open, handleClose, title, description }) => {
  const [editDetails, setEditDetails] = useState(false);

  const handleEditClick = () => {
    setEditDetails(true);
  };

  const handleGoHomeClick = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          width: '80%',
          maxWidth: 400,
          border: '1px solid #fff',
          borderRadius: '5px',
          maxHeight: '80%',
          overflow: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ padding: 3 }}>
            <img src={Image} alt="modal" sx={{ height: 200, mb: 1 }} />
          </Box>  
          <Typography variant="h5" sx={{ mb: 1 }}>
            Congratulations!
          </Typography>
          <Typography variant="body1" sx={{ color: '#6D6D6D', textAlign: 'center' }}>
            Your census details have been successfully registered.
          </Typography>
        </Box>
        <Box 
            display="flex"
            sx={{ m : 2 }}
        >  
          <Button variant="outlined" onClick={handleEditClick} sx={{ 
            m: 'auto',
            width: '300px',
            color: primaryColor,
            borderColor: primaryColor,
            textTransform: 'none'
            }}>
              Edit Details
          </Button>
        </Box>
        <Box 
            display="flex"
            sx={{ 
                m : 2
            }}
        >  
          <Button variant="contained" onClick={handleEditClick} sx={{ 
            m: 'auto',
            width: '300px',
            backgroundColor: primaryColor
            }}>
              Go Home
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MyModal;