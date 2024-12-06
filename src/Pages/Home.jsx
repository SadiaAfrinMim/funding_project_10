import React, { useEffect } from 'react';
import Banner from '../Component/Banner/Banner';
import Faq from '../Component/FAQ/Faq';


import { Outlet } from 'react-router-dom';
import Ourmission from '../Component/Ourmission/Ourmission';


const Home = () => {
    useEffect(()=>{
        document.title('Home||SadiaFund')
      },[])
    return (
        <div className='w-11/12 mx-auto'>
            <Banner></Banner>
           
            <Outlet></Outlet>
            <Ourmission></Ourmission>

            <Faq></Faq>
        </div>
    );
};

export default Home;