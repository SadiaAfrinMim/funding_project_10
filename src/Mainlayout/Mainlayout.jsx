import React, { useContext } from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer';
import useLocalStorage from 'use-local-storage';
import "../App";
import { AuthContex } from '../Authprovider/Authprovider';

const Mainlayout = () => {
    const { isDark,setIsDark } = useContext(AuthContex);
    // const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // const [isDark, setIsDark] = useLocalStorage("isDark", preference);
    return (
        <div className='' data-theme={isDark ? "dark" : "light"}  isChecked={isDark} handleChange={() => setIsDark(!isDark)}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Mainlayout;