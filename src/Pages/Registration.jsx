import React, { useContext, useEffect, useState } from 'react';
import { AuthContex } from '../Authprovider/Authprovider';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert

const Registration = () => {
    useEffect(() => {
        document.title = 'Registration || SadiaFund';
    }, []);

    const { setUser, handleRegistration, updateInformation, setLoading } = useContext(AuthContex);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const image = e.target.photoUrl.value;
        const password = e.target.password.value;

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
            );
            return;
        }

        setError("");
        handleRegistration(email, password)
            .then((result) => {
                const user = result.user;

                updateInformation({ photoURL: image, displayName: name })
                    .then(() => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Registration successful!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                        setLoading(true);
                        setUser(user);
                        setTimeout(() => {
                            setLoading(false);
                        }, 100);
                        navigate("/");
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to update user information.',
                            icon: 'error',
                            confirmButtonText: 'Try Again',
                        });
                    });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message || "Failed to Register. Your email may already exist!",
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="border-2 shadow-lg p-8 w-96">
                <h2 className="text-3xl font-semibold text-center text-[#FF851B] mb-6">
                    Register Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium ">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full  p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDC00]"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDC00]"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            id="photoUrl"
                            name="photoUrl"
                            className="w-full  p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDC00]"
                            placeholder="Enter your photo URL (optional)"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle between text and password
                            id="password"
                            name="password"
                            className="w-full   p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDC00]"
                            placeholder="Create a password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle state
                            className="absolute top-7 right-5"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Register Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white py-3 hover:bg-blue-700 transition duration-200"
                        >
                            Register
                        </button>
                        <p className='font-bold text-xl mt-4'>Already have an account?<NavLink className="text-[#FF851B] underline" to={"/login"}>Login Here</NavLink></p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-600 text-sm font-medium mt-2">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Registration;
