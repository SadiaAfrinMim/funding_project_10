import React, { useState } from "react";


const Reset = () => {
  const [email, setEmail] = useState("");
  

  const handleForgotPassword = () => {
    window.open("https://mail.google.com", "_blank"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 shadow-md rounded-none border-2 border-gray-300">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Login
        </h2>
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-none border-gray-300  focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          {/* Forgot Password */}
          <div className="text-right">
          <button
  type="button"
  onClick={handleForgotPassword}
  className="btn rounded-none w-full btn-primary border-none bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white hover:from-[#FFDC00] hover:to-[#FF851B]"
>
  Forgot Password?
</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
