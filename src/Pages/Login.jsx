import React, { useContext, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
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
        toast.success('Successfully logged in!');
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to sign in with Google.');
      });
  };

  const handleLogInFrom = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    handleLogin(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success('Login Successfully!');
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        setError(true);
        toast.error('Login failed. Please try again.');
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error('Please provide a valid email address.');
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success('Password reset email sent.');
        })
        .catch(() => {
          toast.error('Error sending reset email. Please try again.');
        });
    }
  };

  return (
    <div className="max-w-sm mx-auto my-12 p-6  shadow-lg border-2">
      <h2 className="text-2xl font-bold text-center mb-6">Login your account</h2>
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
            type="button "
            onClick={() => setShowPassword(!showPassword)}
            className="absolute  top-7 right-5"
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
      <ToastContainer />
    </div>
  );
};

export default Login;
