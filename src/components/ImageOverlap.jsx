import  Box  from "@mui/material/Box";

const ImageOverlap = ({ image1, image2, top, left, mirror=false, maxWidth1, maxWidth2, notMobile }) => {
  return (
    <Box sx={{ position: "relative",  maxWidth: "100%" }} mY={'30%'}>
     { mirror ? (
        <>
        <Box
            component="img"
            src={image1}
            alt=""
            sx={{ 
                maxWidth: maxWidth1 ? maxWidth1 : "70%",
                height: "auto",
                float: 'left'
            }}
        />
        <Box
            component="img"
            src={image2}
            alt=""
            sx={{
                position: "absolute",
                top: top ? top : -30,
                left: left ? left : -10,
                maxWidth: maxWidth2 ? maxWidth2 : "70%",
                height: "auto",
                float: "left"
            }}
        />
    </>
     ) : (
        <>
            <Box
                component="img"
                src={image1}
                alt=""
                sx={{ maxWidth: maxWidth1 ? maxWidth1 : "70%", height: "auto", float: 'left' }}
            />
            <Box
                component="img"
                src={image2}
                alt=""
                sx={{
                position: "absolute",
                top: top ? top : (notMobile ? 90 : 50), // 80
                left: left ? left : (notMobile ? 150 : 100), // 150
                maxWidth: maxWidth2 ? maxWidth2 : "70%",
                height: "auto",
                float: "left"
                }}
                objectFit="contain"
            />
        </>
     ) }   
      
    </Box>
  );
};


export default ImageOverlap;