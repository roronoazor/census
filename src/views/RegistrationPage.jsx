import React, { useState } from 'react';
import { Container, Box } from '@mui/system';
import { 
    Typography,
    Grid,
    TextField,
    Stack,
    InputLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { primaryColor } from '../config/constants';
import FeedbackModal from './FeedbackModal';
import { nigeriaLgas } from '../config/states';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { API_URL } from '../config/constants';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';


const RegistrationPage = (props) => {

    const [formData, setFormData] = useState({});
    const [filteredLgas, setFilteredLgas] = useState([]);
    const [filteredResidenceLgas, setFilteredResidenceLgas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);  
    const [message, setMessage] = React.useState('');
    const [token, setToken] = React.useState(null);
    const [fetching, setFetching] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        setToken(storedData?.token);

        if (storedData?.token) {
            setFetching(true);
            axios.get(`${API_URL}/census/record/`, {
              headers: { Authorization: `Bearer ${storedData.token}` }
            })
            .then(response => {
              setFormData(response.data?.detail);
              if (response.data?.detail?.state_of_origin){
                setFilteredLgas(nigeriaLgas[response.data?.detail?.state_of_origin]);
              }
              if (response.data?.detail?.state_of_residence){
                setFilteredResidenceLgas(nigeriaLgas[response.data?.detail?.state_of_residence]);
              }
              setFetching(false);
            })
            .catch(error => {
              console.error(error);
              setFetching(false);
            });
          }
    }, []);

    const registerCensus = async (payload) => {
        const { data } = await axios.post(`${API_URL}/census/record/`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
          return data;
    }

    const moveToLandingPage = () => {
        navigate('/')
        window.scrollTo(0, 0);
    }

    const { mutate, isLoading } = useMutation(registerCensus, {
        onSuccess: (data) => {
          setModalOpen(true);
          // add any other necessary data to state here
        },
        onError: (error) => {
          setMessage(error?.response?.data?.detail || 'Oops! Something went wrong');
          setOpenSnack(true);
        }
      });


    const handleChange = (e) => {   
        
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
        }));

        if (name == 'state_of_residence') {
            setFilteredResidenceLgas(nigeriaLgas[value]);
            return;
        }

        if (name == 'state_of_origin') {
            setFilteredLgas(nigeriaLgas[value]);
            return;
        }
    }

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setMessage('');
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            (!formData?.date_of_birth || !formData?.first_name || !formData?.last_name
             || !formData?.house_address || !formData?.middle_name || !formData?.level_of_education
             || !formData?.marital_status || !formData?.occupation || !formData?.phone_number
             || !formData?.place_of_work || !formData?.residential_building || !formData?.state_of_origin
             || !formData?.state_of_residence || !formData?.type_of_family
                )
            ){
                setOpenSnack(true);
                setMessage('Please fill all required fields!!!')
                return;
        }
        
        mutate(formData);
    }

    console.log('formData -> ', formData);

    if ( fetching ){

        return (
            <>
                <p>Loading...</p>
            </>
        )
    }

    return (
        <Box sx={{ paddingX: '10%' }}>
            <FeedbackModal
                open={modalOpen}
                moveToLandingPage={moveToLandingPage}
                handleClose={() => setModalOpen(false)}
            />
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="warning" sx={{ width: '100%' }}>
                    {message || ''}
                </Alert>
            </Snackbar>
            <Box
                display="flex" 
            >
                <Box m="auto">
                    <Typography variant="h4" gutterBottom sx={{ fontSize: '32px', paddingY: '15px' }}>
                        Registration
                    </Typography>
                </Box>
            </Box>
            <Box
                display="flex" 
                sx={{ m : 2 }}
            >
                <Box m="auto" sx={{  width: '100%' }}>
                        <Typography sx={{ float: 'left', color: '#888888' }}>
                            NAME
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="first-name-input" sx={{ float: 'left', color: '#000' }}>First Name</InputLabel>
                            <TextField
                                sx={{ width: '100%' }}
                                id="first-name-input"
                                variant="outlined"
                                name="first_name"
                                onChange={handleChange}
                                value={formData?.first_name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="middle-name-input" sx={{ float: 'left', color: '#000' }}>Middle Name</InputLabel>
                            <TextField
                                sx={{ width: '100%' }}
                                id="middle-name-input"
                                variant="outlined"
                                name="middle_name"
                                onChange={handleChange}
                                value={formData?.middle_name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="last-name-input" sx={{ float: 'left', color: '#000' }}>Last Name/Surname</InputLabel>
                            <TextField
                                sx={{ width: '100%' }}
                                id="last-name-input"
                                variant="outlined"
                                name="last_name"
                                onChange={handleChange}
                                value={formData?.last_name}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box
                display="flex"
                sx={{ m : 2 }}
            >
                <Box m="auto" sx={{  width: '100%' }}>
                        <Typography sx={{ float: 'left', color: '#888888' }}>
                            DATE OF BIRTH
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="first-name-input" sx={{ float: 'left', color: '#000' }}>Date of Birth</InputLabel>
                            <TextField
                                sx={{ width: '100%' }}
                                id="date-of-birth"
                                variant="outlined"
                                type="date"
                                name="date_of_birth"
                                onChange={handleChange}
                                value={formData?.date_of_birth}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box
                display="flex"
                sx={{ m : 2 }}
            >
                <Box m="auto" sx={{  width: '100%' }}>
                        <Typography sx={{ float: 'left', color: '#888888' }}>
                            MARITAL STATUS
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <RadioGroup
                                row
                                aria-label="marital-status"
                                name="marital_status"
                                value={formData?.marital_status}
                                onChange={handleChange}
                                >
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                                <FormControlLabel
                                value="Single"
                                control={<Radio />}
                                label="Single"
                                sx={{ 
                                    marginLeft: {
                                        xs: '.7%',
                                        md: '0.1%',
                                        sm: '0.1%',
                                        md: '0.1%',
                                        lg: '0.1%',
                                        xl: '0.1%',
                                    },
                                    flexGrow: 1,
                                    textAlign: 'center'
                                }}
                                />
                                <FormControlLabel
                                value="Married"
                                control={<Radio />}
                                label="Married"
                                sx={{ flexGrow: 1, textAlign: 'center' }}
                                />
                                <FormControlLabel
                                value="Divorced"
                                control={<Radio />}
                                label="Divorced"
                                sx={{ flexGrow: 1, textAlign: 'center' }}
                                />
                                <FormControlLabel
                                value="Widowed"
                                control={<Radio />}
                                label="Widowed"
                                sx={{ flexGrow: 1, textAlign: 'center' }}
                                />
                                </Stack>
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box
                display="flex"
                sx={{ m : 2 }}
            >
                <Box m="auto" sx={{  width: '100%' }}>
                        <Typography sx={{ float: 'left', color: '#888888' }}>
                            RESIDENTIAL DETAILS
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="phone-input" sx={{ float: 'left', color: '#000' }}>Phone Number</InputLabel>
                            <TextField
                                sx={{ width: '100%' }}
                                id="phone-input"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <CallOutlinedIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <InputLabel htmlFor="house-address-input" sx={{ float: 'left', color: '#000' }}>House Address</InputLabel>
                            <TextField
                                sx={{ width: '100%' }}
                                id="house-address-input"
                                variant="outlined"
                                name="house_address"
                                value={formData.house_address}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>    
                </Box>
            </Box>
            <Box
                display="flex"
                sx={{ m : 2 }}
            >
                <Box m="auto" sx={{  width: '100%' }}>    
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="residential-building-select" sx={{ float: 'left', color: '#000' }}>Type of Residential Building/Living Quarters</InputLabel>
                            <Select
                                labelId="residential-building-select-label"
                                id="residential-building-select"
                                value={formData?.residential_building}
                                onChange={handleChange}
                                name="residential_building"
                                IconComponent={ExpandCircleDownOutlinedIcon}
                                sx={{ width: '100%', float: 'left', textAlign: 'left' }}
                            >
                                <MenuItem value="Duplex">Duplex</MenuItem>
                                <MenuItem value="Mansion">Mansion</MenuItem>
                                <MenuItem value="Penthouse">Penthouse</MenuItem>
                                <MenuItem value="Apartments or flats">Apartments or flats</MenuItem>
                                <MenuItem value="Terraced house">Terraced house</MenuItem>
                                <MenuItem value="Detached house">Detached house</MenuItem>
                                <MenuItem value="Bungalow">Bungalow</MenuItem>
                                <MenuItem value="Traditional Houses">Traditional Houses</MenuItem>
                            </Select>          
                        </Grid>
                    </Grid>    
                </Box>
            </Box>
            <Box
                display="flex"
                sx={{ m : 2 }}
            >
                <Box  m="auto" sx={{  width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="state-select" sx={{ float: 'left', color: '#000' }}>State of Residence</InputLabel>
                            <Select
                            labelId="state-select-label"
                            id="state-select"
                            value={formData?.state_of_residence}
                            onChange={handleChange}
                            name="state_of_residence"
                            IconComponent={ExpandCircleDownOutlinedIcon}
                            sx={{ width: '100%', float: 'left', textAlign: 'left' }}
                            >
                            <MenuItem value="">--Select--</MenuItem>
                            {(Object.keys(nigeriaLgas)).map((state, index) => (
                                <MenuItem key={index} value={state}>{state}</MenuItem>
                            ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="lga-select" sx={{ float: 'left', color: '#000' }}>LGA of Residence</InputLabel>
                            <Select
                            labelId="lga-select-label"
                            id="lga-select"
                            IconComponent={ExpandCircleDownOutlinedIcon}
                            name="lga_of_residence"
                            onChange={handleChange}
                            value={formData?.lga_of_residence}
                            sx={{ width: '100%', float: 'left', textAlign: 'left' }}
                            >
                            <MenuItem value="">--Select--</MenuItem>
                            {filteredResidenceLgas.map((lga, index) => (
                                <MenuItem key={index} value={lga}>{lga}</MenuItem>
                            ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box
                display="flex"
                sx={{ m : 2 }}
            >
                <Box  m="auto" sx={{  width: '100%' }}>
                    <Typography sx={{ float: 'left', color: '#888888' }}>
                        ORIGIN DETAILS
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="state-select" sx={{ float: 'left', color: '#000' }}>State of Origin</InputLabel>
                            <Select
                            labelId="state-select-label"
                            id="state-select"
                            value={formData?.state_of_origin}
                            onChange={handleChange}
                            name="state_of_origin"
                            IconComponent={ExpandCircleDownOutlinedIcon}
                            sx={{ width: '100%', float: 'left', textAlign: 'left' }}
                            >
                            <MenuItem value="">--Select--</MenuItem>
                            {(Object.keys(nigeriaLgas)).map((state, index) => (
                                <MenuItem key={index} value={state}>{state}</MenuItem>
                            ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="lga-select" sx={{ float: 'left', color: '#000' }}>LGA of Origin</InputLabel>
                            <Select
                            labelId="lga-select-label"
                            id="lga-select"
                            value={formData?.lga_of_origin}
                            name="lga_of_origin"
                            onChange={handleChange}
                            IconComponent={ExpandCircleDownOutlinedIcon}
                            sx={{ width: '100%', float: 'left', textAlign: 'left' }}
                            >
                            <MenuItem value="">--Select--</MenuItem>
                            {filteredLgas.map((lga, index) => (
                                <MenuItem key={index} value={lga}>{lga}</MenuItem>
                            ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box
                display="flex" 
                sx={{ m : 2 }}
            >
                <Box m="auto" sx={{  width: '100%' }}>
                        <Typography sx={{ float: 'left', color: '#888888' }}>
                            OCCUPATIONAL STATUS
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="occupation-input" sx={{ float: 'left', color: '#000' }}>Occupation</InputLabel>
                            <TextField
                                sx={{ width: '100%' }}
                                id="occupation-input"
                                variant="outlined"
                                name="occupation"
                                onChange={handleChange}
                                value={formData?.occupation}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <InputLabel htmlFor="place-of-work-input" sx={{ float: 'left', color: '#000' }}>Place of Work</InputLabel>
                            <TextField
                                sx={{ width: '100%' }}
                                id="place-of-work-input"
                                variant="outlined"
                                name="place_of_work"
                                onChange={handleChange}
                                value={formData?.place_of_work}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box
                display="flex"
                sx={{ m : 2 }}
            >
                <Box m="auto" sx={{  width: '100%' }}>
                        <Typography sx={{ float: 'left', color: '#888888' }}>
                            EDUCATIONAL STATUS
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="education-input" sx={{ float: 'left', color: '#000' }}>Level of Education</InputLabel>
                            <Select
                                labelId="education-select-label"
                                id="education-select"
                                value={formData?.level_of_education}
                                name="level_of_education"
                                onChange={handleChange}
                                IconComponent={ExpandCircleDownOutlinedIcon}
                                sx={{ width: '100%', float: 'left', textAlign: 'left' }}
                            >
                                <MenuItem value="Kindergarten (Grade school)">Kindergarten (Grade school)</MenuItem>
                                <MenuItem value="Primary(Middle school)">Primary(Middle school)</MenuItem>
                                <MenuItem value="Secondary (High school)">Secondary (High school)</MenuItem>
                                <MenuItem value="Tertiary (University/ College of Education/ Polytechnic)">Tertiary (University/ College of Education/ Polytechnic)</MenuItem>
                            </Select>       
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box
                display="flex"
                sx={{ m : 2 }}
            >
                <Box m="auto" sx={{  width: '100%' }}>
                        <Typography sx={{ float: 'left', color: '#888888' }}>
                            FAMILY COMPOSITION
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="family-input" sx={{ float: 'left', color: '#000' }}>Type of Family</InputLabel>
                            <Select
                                labelId="family-input-label"
                                id="family-input"
                                name="type_of_family"
                                value={formData?.type_of_family}
                                onChange={handleChange}
                                IconComponent={ExpandCircleDownOutlinedIcon}
                                sx={{ width: '100%', float: 'left', textAlign: 'left' }}
                            >
                                <MenuItem value="Nuclear">Nuclear</MenuItem>
                                <MenuItem value="Extended">Extended</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>   
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box
                display="flex"
                sx={{ m : 2 }}
            >
                <Box m="auto">
                    <LoadingButton
                        sx={{ 
                            backgroundColor: primaryColor,
                            width: 300,
                            textTransform: 'none',
                            padding: 1
                        }} 
                        variant="contained"
                        loading={isLoading}
                        onClick={handleSubmit}
                        >
                            Save
                        </LoadingButton>
                </Box>
            </Box>
        </Box>
    );
};

export default RegistrationPage;