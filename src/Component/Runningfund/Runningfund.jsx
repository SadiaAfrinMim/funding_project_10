import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'

const RunningFund = () => {
  const campaigns = useLoaderData();


  // Get the current date
  const currentDate = new Date();

  // Filter active campaigns where the deadline is in the future
  const activeCampaigns = campaigns.filter((campaign) => {
    const campaignDeadline = new Date(campaign.deadline);
    return campaignDeadline > currentDate; // Only campaigns where the deadline has not passed
  });

  // State to track expanded description for each campaign
  const [expandedCampaignId, setExpandedCampaignId] = useState(null);

 
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-[#FF851B] mb-8 isType" >
       Running Campaigns
      </h2>
      {activeCampaigns.length === 0 ? (
        <p className="text-center text-gray-600">No active campaigns at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCampaigns.map((campaign) => {
            // Check if the campaign is still active (not passed its deadline)
            const isActive = new Date(campaign.deadline) > currentDate;

            return (
              <div
                key={campaign._id} // Using _id as key for uniqueness
                className="w-full shadow-xl border border-[#FF851B] transform transition duration-500 hover:scale-105 relative"
              >
                {/* Corner badge indicating active or inactive */}
                <div
                  className={`absolute top-2 right-2 px-3 py-1 text-white font-bold text-sm rounded-full ${isActive ? "bg-green-500" : "bg-gray-500"}`}
                >
                  {isActive ? "Active" : "Inactive"}
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
                  <p className="mt-2">
                    {expandedCampaignId === campaign._id
                      ? campaign.description
                      : `${campaign.description.slice(0, 80)}...`}
                  </p>
                  <div className="flex justify-between mt-4 text-sm ">
                    <span>
                      <strong>Minimum Donation:</strong> ${campaign.minimumDonation}
                    </span>
                    <span>
                      <strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="card-actions flex justify-end mt-6">
                    <Link to={`/campaigns/${campaign._id}`}
                      // Toggle description
                      className="btn rounded-none btn-primary border-none bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white hover:from-[#FFDC00] hover:to-[#FF851B]"
                    >
                      See more
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RunningFund;
