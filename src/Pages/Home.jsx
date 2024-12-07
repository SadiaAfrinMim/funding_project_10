import React, { useEffect } from 'react';
import Banner from '../Component/Banner/Banner';
import Faq from '../Component/FAQ/Faq';


import { Outlet } from 'react-router-dom';
import Ourmission from '../Component/Ourmission/Ourmission';
import { Helmet } from 'react-helmet-async';


const Home = () => {
    
    return (

        <div className='w-11/12 mx-auto'>
            <Helmet>
                <title>SadiaFund || Home</title>
            </Helmet>
            <Banner></Banner>
           
            <Outlet></Outlet>
            <Ourmission></Ourmission>

            <Faq></Faq>
        </div>
    );
};

export default Home;