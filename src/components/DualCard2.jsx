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
import ArrowButton from './ArrowButton';
import economicPolicy from  '../assets/economicPolicy.png';
import dataGuiding from '../assets/dataGuiding.png';
import revenueEstimation from '../assets/revenueEstimation.png';
import provisionSocialAmenities from '../assets/provisionSocialAmenities.png';
import determinationPopulation from '../assets/determinationPopulation.png';
import backgroundRec from '../assets/backgroundRec.png';

const contents = [
    {
        id: 1 ,
        title: 'Formulation of Economic Policies',
        body: 'Census data identifies needs and demands of the population, informing policies on employment, healthcare, education, and social welfare. Policymakers can make informed decisions on resource allocation with a comprehensive understanding of it.',
        image1: backgroundRec,
        image2: economicPolicy,
        mirror: true
    },
    {
        id: 2 ,
        title: 'Data Guiding Resources Allocation',
        body: 'Census data informs policies on employment, healthcare, education, and social welfare by helping policymakers understand the needs and demands of the population.',
        image1: backgroundRec,
        image2: dataGuiding,
        mirror: true
    },
    {
        id: 3,
        title: 'Revenue Estimation',
        body: 'Population census data is used to estimate tax, sales, and other revenue by identifying population size, income levels, and spending patterns. Policymakers use this information to plan national budgets and make informed decisions about taxation and public spending.',
        image1: backgroundRec,
        image2: revenueEstimation,
        mirror: true
    },
    {
        id: 4,
        title: 'Provision of Social Amenities',
        body: 'Census data reveals the demands of the population, such as healthcare, education, and social welfare. Policymakers use this information to plan for the provision of social amenities where they are needed most.',
        image1: backgroundRec,
        image2: provisionSocialAmenities,
        mirror: true
    },
    {
        id: 5,
        title: 'Determination of Population Density',
        body: 'Census data is critical in determining population density for urban planning, transportation, environmental management, and policymaking. Accurate data is also vital in managing resources and ensuring sustainable development.',
        image1: backgroundRec,
        image2: determinationPopulation,
        mirror: true
    }
]


const RenderMobileRow = ({title, body, image1, image2, mirror}) => {
    return (
        <>
            <Grid item xs={12} md={4} align='center'>
                <ImageOverlap 
                    image1={image1}
                    image2={image2}
                    mirror={mirror}
                    maxWidth1={'100%'}
                    maxWidth2={'100%'}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Box sx={{ width: '100%', padding: '15px' }}>
                    <Typography align="left" variant="h4" component="h4">{title}</Typography>
                    <br />
                    <Typography variant="body1" align="left" gutterBottom>{body}</Typography>
                </Box>
            </Grid>
        </>
    )
}

const RenderDesktopRowLeft = ({title, body, image1, image2, mirror}) => {
    return (
        <>
            <Grid item xs={12} md={8}>
                <Box sx={{ width: '100%', padding: '15px' }}>
                    <Typography align="left" variant="h4" component="h4">{title}</Typography>
                    <br />
                    <Typography variant="body1" align="left" gutterBottom>{body}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <ImageOverlap 
                    image1={image1}
                    image2={image2}
                    mirror={mirror}
                    maxWidth1={'100%'}
                    maxWidth2={'100%'}
                />
            </Grid>
        </>
    )
}


const RenderDesktopRowRight = ({title, body, image1, image2, mirror}) => {
    return (
        <>
            <Grid item xs={12} md={4}>
                <ImageOverlap 
                    image1={image1}
                    image2={image2}
                    mirror={mirror}
                    maxWidth1={'100%'}
                    maxWidth2={'100%'}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Box sx={{ width: '100%', padding: '15px' }}>
                    <Typography align="left" variant="h4" component="h4">{title}</Typography>
                    <br />
                    <Typography variant="body1" align="left" gutterBottom>{body}</Typography>
                </Box>
            </Grid>
        </>
    )
}

const RenderRow = (props) => {
    const notMobile = useMediaQuery('(min-width:600px)');

    if (notMobile) {
        const { id } = props;
        if ( id % 2 == 0){
            return <RenderDesktopRowRight {...props} />
        }else {
            return <RenderDesktopRowLeft {...props} />
        }
    }

    return <RenderMobileRow {...props} />
}

const DualCard2 = (props) => {

    const notMobile = useMediaQuery('(min-width:600px)');

    return (
        <Container sx={{ marginTop: (notMobile ? '5%' : '10%') }}>
            <Box sx={{ marginBottom: (notMobile ? '10%' : '10%') }}>
                <Typography variant="h3" component="h3">
                    Why Register for Census?
                </Typography>
            </Box>
            <Grid container spacing={6} sx={{ alignItems: 'center', padding: '20px' }}>
                {
                    contents.map((content, index) => {
                        return <RenderRow {...content} />
                    })
                }
            </Grid>
            <Grid item xs={12}> 
                <Box sx={{ width: '100%', padding: '15px' }}>
                    <Typography align="left" variant="h3" component="h4" align="center" sx={{ marginBottom: '5%' }}>Contribute to This Change</Typography>
                    <br />
                    <ArrowButton />  
                    <br /><br />
                </Box>
            </Grid>
        </Container>
        );
    }


export default DualCard2;