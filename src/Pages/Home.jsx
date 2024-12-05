import React from 'react';
import Banner from '../Component/Banner/Banner';
import Faq from '../Component/FAQ/Faq';


import { Outlet } from 'react-router-dom';
import Ourmission from '../Component/Ourmission/Ourmission';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
           
            <Outlet></Outlet>
            <Ourmission></Ourmission>

            <Faq></Faq>
        </div>
    );
};

export default Home;