import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContex } from "../Authprovider/Authprovider";
import { useLottie } from "lottie-react";
import donationAnimation from '../assets/donation.json';

// Reusable Modal Component
const Modal = ({ isOpen, title, children, onClose, user, minimumDonation }) => {
  if (!isOpen) return null;

  const options = {
    animationData: donationAnimation,  // Use the imported animation data
    loop: true,                       // Set loop to true for continuous playback
    autoplay: true,                   // Set autoplay to true to start animation automatically
  };

  const { View } = useLottie(options); 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-md shadow-lg border-orange-500 border rounded-none">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        <div className="w-40 mx-auto">{View}</div>
        
        <div>{children}</div>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 w-full bg-gray-500 text-white rounded-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const CampaignDetails = () => {
  const { user } = useContext(AuthContex); // Ensure user data is available
  const data = useLoaderData();
  const navigate = useNavigate();

  if (!data) return <p>Loading...</p>;

  const { id, title, image, description, deadline, minimumDonation: initialMinimumDonation } = data;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDonationComplete, setIsDonationComplete] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [isDeadlineOver, setIsDeadlineOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [minimumDonation, setMinimumDonation] = useState(initialMinimumDonation || 0);  // Initialize with the fetched minimumDonation

  // Fetch campaign data (including minimumDonation) if needed
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await fetch(`https://your-api-endpoint.com/campaign/${id}`);
        const result = await response.json();
        if (result && result.minimumDonation !== undefined) {
          setMinimumDonation(result.minimumDonation); // Update minimumDonation dynamically from fetched data
        }
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      }
    };

    fetchCampaignData();
  }, [id]); // Run only when the id changes

  // Calculate remaining time
  useEffect(() => {
    const updateRemainingTime = () => {
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

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const handleDonationSubmit = async () => {
    // Check if the donation is valid
    if (isDeadlineOver || !donationAmount || donationAmount < minimumDonation) {
      Swal.fire({
        icon: "error",
        title: "Invalid Donation",
        text: isDeadlineOver
          ? "Campaign has ended."
          : `Minimum donation is $${minimumDonation}.`,
      });
      return;
    }

    setIsSubmitting(true);

    const donationData = {
      image,
      campaignId: id,
      campaignTitle: title,
      description,
      minimumDonation,
      deadline,
      userEmail: user?.email, // Check if user exists
      username: user?.displayName || "Anonymous", // Provide fallback for username
      donationAmount, // Using the donationAmount entered by the user
      donationOn: new Date().toISOString(), // Set donation timestamp
    };

    try {
      const response = await fetch(
        "https://user-server-side-management-system.vercel.app/donation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(donationData),
        }
      );

      if (!response.ok) throw new Error("Failed to donate");

      // Display donation success with user information in SweetAlert
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        html:  
          `<p>Your donation of $${donationAmount} is appreciated!</p>
          <p><strong>Donor:</strong> ${user?.displayName || "Anonymous"}</p>
          <p><strong>Email:</strong> ${user?.email || "No email provided"}</p>
          <p><strong>Amount Donated:</strong> $${donationAmount}</p>`,
      });
      setIsDonationComplete(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to process your donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 border border-orange-500 rounded-none">
      <Helmet>
        <title>Campaign Details | SadiaFund</title>
      </Helmet>
      <ToastContainer />
      <h2 className="text-4xl font-bold text-center text-orange-600 mb-6">
        {title}
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={image}
          alt={title}
          className="w-full md:w-1/2 border border-orange-500 rounded-none object-cover"
        />
        <div className="md:w-1/2 text-center md:text-left">
          <p>{description}</p>
          <p>
            <strong>Minimum Donation:</strong> ${minimumDonation}
          </p>
          <p>
            <strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}
          </p>
          <p>
            <strong>Time Remaining:</strong> {remainingTime}
          </p>
        </div>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isDeadlineOver || isDonationComplete}
          className={`px-6 py-3 border border-orange-500 rounded-none ${
            isDeadlineOver
              ? "bg-gray-400"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {isDonationComplete ? "Thank You!" : "Donate Now"}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={`Donate to ${title}`}
        onClose={() => setIsModalOpen(false)}
        user={user}
        minimumDonation={minimumDonation}
      >
        <div>
          <label htmlFor="donationAmount" className="block mb-2">
            Donation Amount:
          </label>
          <input
            type="number"
            id="donationAmount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full px-4 py-2 border border-orange-500 rounded-none"
            min={minimumDonation}
            placeholder={`Min $${minimumDonation}`}
          />
        </div>
        <button
          onClick={handleDonationSubmit}
          className="mt-4 px-6 py-2 bg-orange-500 text-white border border-orange-500 rounded-none w-full"
        >
          {isSubmitting ? "Processing..." : "Confirm Donation"}
        </button>
      </Modal>

      {isDeadlineOver && (
        <button
          onClick={() => navigate("/campaigns")}
          className="mt-4 px-6 py-3 bg-gray-500 text-white border border-orange-500 rounded-none"
        >
          Back to Campaigns
        </button>
      )}
    </div>
  );
};

export default CampaignDetails;
