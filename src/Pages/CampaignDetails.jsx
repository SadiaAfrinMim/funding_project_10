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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [donationAmount, setDonationAmount] = useState(""); // Donation amount input state

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

      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const handleDonate = async () => {
    if (isDeadlineOver) {
      Swal.fire({
        icon: 'error',
        title: 'Campaign Closed',
        text: 'The campaign deadline has passed. Donations are no longer accepted.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (!donationAmount || donationAmount < minimumDonation) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Donation Amount',
        text: `Minimum donation is $${minimumDonation}. Please enter a valid amount.`,
        confirmButtonColor: '#d33',
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
      donationAmount,
      donationOn,
    };

    try {
      // Make API call to store the donation data
      const response = await fetch("https://user-server-side-management-system.vercel.app/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error("Failed to donate");
      }

      Swal.fire({
        icon: 'success',
        title: 'Thank You for Your Donation!',
        html: `
          <p><strong>Name:</strong> ${user.displayName || "Anonymous"}</p>
          <p><strong>Email:</strong> ${user.email || "N/A"}</p>
          <p>Your contribution of $${donationAmount} means a lot to us!</p>
        `,
        confirmButtonColor: '#3085d6',
      });

      setIsDonationComplete(true);
      setIsModalOpen(false); // Close modal after successful donation
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

      <div className="text-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)} // Open modal on click
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-70 flex justify-center items-center z-50">
            <div className="rounded-none p-8 border border-orange-500 bg-gray-100 w-96 max-w-sm shadow-lg transform transition-all duration-300 scale-100 hover:scale-105">
              <h2 className="text-2xl font-bold text-[#FF851B] mb-4 text-center">
                Donate to {title}
              </h2>
              <p className="text-lg text-black mb-4 text-center">
                Your support is critical to achieving our goal.
              </p>

              <div className="mb-6">
                <label
                  htmlFor="donationAmount"
                  className="block text-sm font-medium"
                >
                  Enter Donation Amount:
                </label>
                <input
                  type="number"
                  id="donationAmount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-[#FF851B] focus:border-[#FF851B]"
                  placeholder="Enter amount"
                  min={minimumDonation}
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setIsModalOpen(false)} // Close modal
                  className="py-2 px-6 rounded-none text-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDonate}
                  className="bg-gradient-to-r rounded-none from-[#FF851B] to-[#FFDC00] text-white py-2 px-6  text-lg"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isDeadlineOver && (
        <button
          onClick={() => navigate('/campaigns')} // Navigate to campaigns page
          className="px-8 py-3 text-lg font-bold rounded-none text-white bg-gray-500  shadow-md transition duration-300 mt-4 hover:scale-105"
        >
          Close
        </button>
      )}
    </div>
  );
};

export default CampaignDetails;
