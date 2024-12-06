import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContex } from "../Authprovider/Authprovider";
import { Typewriter } from "react-simple-typewriter";

const MyCampaigns = () => {
  const { user } = useContext(AuthContex);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDonations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/donation`);
        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }
        const data = await response.json();

        // Filter donations to show only those created by the logged-in user
        const userDonations = data.filter(
          (donation) => donation.userEmail === user.email
        );
        setDonations(userDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
        toast.error("Failed to load your donations.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDonations();
  }, [user.email]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
        <Typewriter
          words={["My Donated Campaigns"]}
          loop={5}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>
      {donations.length === 0 ? (
        <p className="text-center text-lg">
          No donations found. Start contributing today!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{donation.
campaignTitle}</h3>
                <p className="line-clamp-3">{donation.description}</p>
                <p className="mt-2">
                  <strong>Minimum Donation:</strong> $
                  {donation.minimumDonation}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(donation.deadline).toLocaleDateString()}
                </p>
                <p>
                  <strong>Donated On:</strong>{" "}
                  {new Date(donation.donationOn).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCampaigns;
