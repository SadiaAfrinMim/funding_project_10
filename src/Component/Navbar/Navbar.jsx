import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContex } from '../../Authprovider/Authprovider';
import { Toggle } from '../Darkmode/Darkmode';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut, isDark, setIsDark } = useContext(AuthContex);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    </>
  );

  const handleLogin = () => {
    Swal.fire({
      title: 'Log in',
      text: 'Are you sure you want to log in?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, log in',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    });
  };

  const handleRegister = () => {
    Swal.fire({
      title: 'Register',
      text: 'Are you sure you want to register?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, register',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/register');
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Log out',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire('Logged out', 'You have been logged out successfully.', 'success');
      }
    });
  };

  return (
    <div className="navbar w-full mx-auto sticky top-0 left-0 right-0 z-50 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
          </button>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm z-50 dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              {Navlink}
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          SadiaFund 🤝
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Navlink}</ul>
      </div>

      <div className="navbar-end space-x-2">
        <div>
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        </div>
        {!user ? (
          <>
            <button
              className="btn btn-primary rounded-none mr-2"
              onClick={handleLogin}
            >
              Log in
            </button>

            <button
              className="btn bg-orange-500 rounded-none"
              onClick={handleRegister}
            >
              Register
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            {/* User Avatar */}
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />

              {/* Display Name on Hover */}
              <div className="absolute whitespace-nowrap w-full text-center rounded-lg mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {user.displayName}
              </div>
            </div>

            {/* Log out Button */}
            <button
              className="btn btn-error text-white btn-sm rounded-none"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
