import React from "react";
import Header from '../components/Header';
import DualCard from "../components/DualCard";
import DualCard2 from "../components/DualCard2";

const LandingPage = (props) => {

    
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        setData(storedData);
    }, []);

    return (
        <>
            <Header
              authenticated={ data ? true : false }
              data={data}  
            />
            <DualCard 
              authenticated={ data ? true : false }
              data={data}
            />
            <DualCard2 
              authenticated={ data ? true : false }
              data={data}
            />
        </>
    );
}

export default LandingPage;