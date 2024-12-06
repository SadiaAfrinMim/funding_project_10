import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import AOS from "aos";
import "aos/dist/aos.css";

const RunningFund = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://user-server-side-management-system.vercel.app/campaigns?limit=6"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        const data = await response.json();

        // Filter out inactive campaigns based on deadline
        const currentDate = new Date();
        const activeCampaigns = data.filter(
          (campaign) => new Date(campaign.deadline) > currentDate
        );

        setCampaigns(activeCampaigns);

        // Delay hiding the spinner
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const currentDate = new Date();

  return (
    <div className="overflow-hidden mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-[#FF851B] mb-8">
        <Typewriter
          words={["Running Campaigns"]}
          loop={5}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin border-4 border-t-4 border-orange-500 rounded-full w-16 h-16 mb-6"></div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-center text-gray-600">
          No active campaigns at the moment.
        </p>
      ) : (
        <div
          data-aos="zoom-in"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="w-full shadow-xl border border-[#FF851B] transform transition duration-500 hover:scale-105 relative"
            >
              <div
                className={`absolute top-2 right-2 px-3 py-1 text-white font-bold text-sm rounded-full ${
                  new Date(campaign.deadline) > currentDate
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                Active
              </div>
              <figure>
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body p-6">
                <h3 className="card-title text-2xl font-semibold text-[#FF851B]">
                  {campaign.title}
                </h3>
                <p className="mt-2">{`${campaign.description.slice(0, 80)}...`}</p>
                <div className="flex justify-between mt-4 text-sm">
                  <span>
                    <strong>Minimum Donation:</strong> $
                    {campaign.minimumDonation}
                  </span>
                  <span>
                    <strong>Deadline:</strong>{" "}
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="card-actions flex justify-end mt-6">
                  <Link
                    to={`/campaigns/${campaign._id}`}
                    className="btn rounded-none btn-primary border-none bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white hover:from-[#FFDC00] hover:to-[#FF851B]"
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RunningFund;
