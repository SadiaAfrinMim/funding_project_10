import React from 'react';
import { useLottie } from "lottie-react";
import donationAnimation from '../assets/donation.json'; // Your donation animation file

const Lottie = () => {
  // Lottie options configuration
  const options = {
    animationData: donationAnimation,  // Use the imported animation data
    loop: true,                       // Set loop to true for continuous playback
    autoplay: true,                   // Set autoplay to true to start animation automatically
  };

  // Use the useLottie hook to get the View component
  const { View } = useLottie(options); 

  return (
    <div>
      {View} {/* Render the Lottie animation here */}
    </div>
  );
};

export default Lottie;
