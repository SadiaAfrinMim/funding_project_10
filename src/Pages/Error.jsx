import React, { useContext, useEffect } from 'react';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer';
import { Link } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';
import { Helmet } from 'react-helmet-async';


const Error = () => {
 
  
    const { isDark,setIsDark } = useContext(AuthContex);
    return (
        <div data-theme={isDark ? "dark" : "light"}  isChecked={isDark} handleChange={() => setIsDark(!isDark)}>
          
             

         
          <Navbar></Navbar>
     
     <div className="flex m-12 flex-col items-center justify-center w-full space-y-6 px-4">
     <Helmet>
  <title>Error || SadiaFund</title>
</Helmet>
       {/* Container with consistent width */}
       <div className="w-full max-w-2xl">
         {/* Background image */}
         <img
           className="w-full object-cover rounded-lg"
           src="https://i.ibb.co.com/Y02kQsR/istockphoto-500639166-1024x1024-1.jpg"
           alt="404 Error: Page not found"
         />

         {/* Content */}
         <div className="text-center w-full mt-4">
           <Link
             to="/"
             className="w-full block text-white  bg-yellow-500"
           >
             Go to Home
           </Link>
         </div>
       </div>
     </div>
     <Footer></Footer>
          </div>
      
     
    );
};

export default Error;