import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContex } from "../Authprovider/Authprovider";
import Swal from 'sweetalert2'; // Import SweetAlert2

const CampaignDetails = () => {
  const { user, displayName } = useContext(AuthContex);
  const data = useLoaderData();
  const navigate = useNavigate(); // Initialize useNavigate

  if (!data) {
    return <p>Loading...</p>; // Handle loading state
  }

  const { id, title, image, description, minimumDonation, deadline } = data;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDonationComplete, setIsDonationComplete] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [isDeadlineOver, setIsDeadlineOver] = useState(false);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const end = new Date(deadline);
      const difference = end - now;

      if (difference <= 0) {
        setRemainingTime("Campaign has ended");
        setIsDeadlineOver(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setRemainingTime(
        `${days}d ${hours}h ${minutes}m ${seconds}s remaining`
      );
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const handleDonate = async () => {
    if (isDeadlineOver) {
      // Show SweetAlert modal when the deadline has passed
      Swal.fire({
        icon: 'error',
        title: 'Campaign Closed',
        text: 'The campaign deadline has passed. Donations are no longer accepted.',
        confirmButtonColor: '#d33', // Red button color for error
      });
      return;
    }

    setIsSubmitting(true);
    const donationOn = new Date().toISOString();

    const donationData = {
      image,
      campaignId: id,
      campaignTitle: title,
      description,
      minimumDonation,
      deadline,
      userEmail: user.email,
      username: user.displayName,
      donationOn
    };

    try {
      const response = await fetch("http://localhost:5000/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error("Failed to donate");
      }

      Swal.fire("Thank you for your donation!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setIsDonationComplete(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing your donation.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 rounded-none shadow-lg border border-gray-200">
      <ToastContainer />
      <h2 className="text-4xl font-bold text-center text-[#FF851B] mb-6 uppercase">
        {title}
      </h2>
      <div className="flex flex-col rounded-none md:flex-row items-center mb-8 gap-6">
        <div className="w-full rounded-none md:w-1/2">
          <img
            src={image}
            alt={`Image for ${title}`}
            className="w-full h-96 object-cover rounded-none border-2 border-orange-500 shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg font-semibold mb-4">{description}</p>
          <p className="text-lg font-medium">
            <strong>Minimum Donation:</strong> ${minimumDonation}
          </p>
          <p className="text-lg">
            <strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}
          </p>
          <p className="text-lg btn btn-outline outline-double outline-orange-500 font-bold text-orange-500 rounded-none mt-4">
            <strong>Time Remaining:</strong> {remainingTime}
          </p>
        </div>
      </div>

      {/* Donate Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleDonate}
          className={`px-8 py-3 text-lg font-bold text-white rounded-none shadow-md transition duration-300 ${
            isDeadlineOver || isDonationComplete
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 rounded-none to-yellow-400 hover:scale-105"
          }`}
          disabled={isSubmitting || isDonationComplete || isDeadlineOver}
        >
          {isSubmitting
            ? "Processing..."
            : isDonationComplete
            ? "Donated"
            : isDeadlineOver
            ? "Closed"
            : "Donate"}
        </button>

        {/* Close Button */}
        {isDeadlineOver && (
          <button
            onClick={() => navigate('/campaigns')} // Navigate to campaigns page
            className="px-8 py-3 text-lg font-bold text-white bg-gray-500 rounded-none shadow-md transition duration-300 mt-4 hover:scale-105"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
