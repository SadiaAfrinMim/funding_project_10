import React, { useEffect } from 'react';
import Banner from '../Component/Banner/Banner';
import Faq from '../Component/FAQ/Faq';


import { Outlet } from 'react-router-dom';
import Ourmission from '../Component/Ourmission/Ourmission';
import { Helmet } from 'react-helmet-async';


const Home = () => {
    
    return (

        <div >
            <Helmet>
                <title>SadiaFund || Home</title>
            </Helmet>
            <Banner></Banner>
            
           
          <div className='w-11/12 mx-auto'>
          <Outlet></Outlet>
            <Ourmission></Ourmission>

            <Faq></Faq>
          </div>
        </div>
    );
};

export default Home;