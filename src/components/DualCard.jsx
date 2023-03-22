import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { primaryColor, secondaryColor } from '../config/constants';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageOverlap from './ImageOverlap';
import Image1 from '../assets/Image1.png';
import Image2 from '../assets/Image2.png';


const DualCard = (props) => {

    const notMobile = useMediaQuery('(min-width:600px)');

    return (
        <Container>
            <Grid container spacing={2} sx={{ alignItems: 'center', padding: '20px'  }}>
                <Grid item xs={12} md={5}>
                    <Box sx={{ width: '100%', maxWidth: 500 }}>
                        <Typography align="left" variant="h3" component="h3">Let Us Make</Typography>
                        <Typography align="left" variant="h3" component="h3">it Count!</Typography>
                        <Typography variant="body1" align="left" gutterBottom>
                            By registering for the census, we contribute to the <span><br /></span> 
                            data that guides the country's resource allocation <span><br /></span>
                            and amenity distribution.
                        </Typography>
                        <Stack direction={ notMobile ? "row" : "column" } spacing={2}>.
                            <Button variant="outlined" sx={{ height: '40px', width: '100%' ,  color: primaryColor, borderColor: primaryColor, textTransform: 'none' }}>
                                Create Account
                            </Button>
                            <Button variant="contained" sx={{ height: '40px', width: '100%' , color: '#fff', backgroundColor: primaryColor, textTransform: 'none' }}>
                                Register Now
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7} sx={{ marginBottom: '2%' }}>
                        <ImageOverlap 
                            image1={Image2}
                            image2={Image1}
                            notMobile={notMobile}
                        />
                </Grid>
            </Grid>
        </Container>
    );
}

export default DualCard;