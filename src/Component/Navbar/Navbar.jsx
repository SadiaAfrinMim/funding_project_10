import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContex } from '../../Authprovider/Authprovider';
// import useLocalStorage from 'use-local-storage';
import { Toggle } from '../Darkmode/Darkmode';
// import "../../App";

const Navbar = () => {
 
  const { user, logOut,isDark, setIsDark } = useContext(AuthContex);
  const navigate = useNavigate();
  // const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const [isDark, setIsDark] = useLocalStorage("isDark", preference);


  const Navlink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]"
              : "border-b-4 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/campaigns"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r  rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]"
              : "border-b-4 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none"
          }
        >
          All Campaigns
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-campaign"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]"
                  : "border-b-4 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none"
              }
            >
              Add New Campaign
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-campaigns"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]"
                  : "border-b-4 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none"
              }
            >
              My Campaigns
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-donations"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]"
                  : "border-b-4 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none"
              }
            >
              My Donations
            </NavLink>
          </li>
         
        </>
        
      )}
       <div >
            <Toggle  isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
           
          </div>
    </>
  );

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {Navlink}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          WebsiteName
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Navlink}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <>
            <button className="btn btn-primary mr-2" onClick={handleLogin}>
              Log in
            </button>
            <button className="btn btn-secondary" onClick={handleRegister}>
              Register
            </button>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="User Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow"
            >
              <li className="text-center">
                <span>{user.displayName}</span>
              </li>
              <li>
                <button className="btn btn-error btn-block" onClick={logOut}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
