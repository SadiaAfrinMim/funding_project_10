import React, { useContext, useEffect, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert
import { useLottie } from "lottie-react";
import donationAnimation from '../assets/donation.json';

const Login = () => {
  useEffect(()=>{
    document.title('Login||SadiaFund')
  },[])

  const options = {
    animationData: donationAnimation,  // Use the imported animation data
    loop: true,                       // Set loop to true for continuous playback
    autoplay: true,                   // Set autoplay to true to start animation automatically
  };

  // Use the useLottie hook to get the View component
  const { View } = useLottie(options); 


  const { handleLogin, handleGoogleSignIn, setUser } = useContext(AuthContex);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleGoogleSign = (e) => {
    e.preventDefault();
    handleGoogleSignIn()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          title: 'Success!',
          text: 'Successfully logged in!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Failed to sign in with Google.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      });
  };

  const handleLogInFrom = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter both email and password.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    handleLogin(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          title: 'Success!',
          text: 'Login Successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        setError(true);
        Swal.fire({
          title: 'Error!',
          text: 'Login failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      Swal.fire({
        title: 'Error!',
        text: 'Please provide a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Password reset email sent.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        })
        .catch(() => {
          Swal.fire({
            title: 'Error!',
            text: 'Error sending reset email. Please try again.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
        });
    }
  };

  return (
    <div className="max-w-sm mx-auto my-12 p-6  shadow-lg border-2">
      <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">Login your account</h2>
      <div className='w-32 mx-auto'>
      {View}
      </div>
      <form onSubmit={handleLogInFrom} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF851B ]"
            ref={emailRef}
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF851B]"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-7 right-5"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <p className={`text-center text-red-700 ${!error ? 'hidden' : ''}`}>Password and email are wrong!</p>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white font-semibold"
          >
            Login
          </button>
          <p className="font-bold text-xl mt-4">
            Don't Have An Account?{' '}
            <NavLink to={'/register'} className="text-[#FF851B] underline">
              Register
            </NavLink>
          </p>
        </div>
      </form>
      <div className="mt-2 mb-6 text-center">
        <Link to={'/reset'} onClick={handleForgetPassword} className="text-blue-500 font-bold underline text-sm">
          Forgot Password?
        </Link>
      </div>
      <button
        onClick={handleGoogleSign}
        className="btn w-full  border border-gray-300 flex items-center justify-center space-x-2"
      >
        <FcGoogle /> <span>Google Sign In</span>
      </button>
    </div>
  );
};

export default Login;
