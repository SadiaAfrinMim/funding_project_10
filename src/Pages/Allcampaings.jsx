import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';
import { Typewriter } from 'react-simple-typewriter';
import { Helmet } from 'react-helmet-async';

const AllCampaigns = () => {
  const { user } = useContext(AuthContex);
  const campaignsData = useLoaderData();
  const [campaigns, setCampaigns] = useState(campaignsData);
  const [sortOrder, setSortOrder] = useState('asc'); // State to track sorting order

  // Handle sorting
  const handleSort = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.minimumDonation - b.minimumDonation;
      } else {
        return b.minimumDonation - a.minimumDonation;
      }
    });
    setCampaigns(sortedCampaigns);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  return (
    <div className=" mt-10 px-4">
      <Helmet>
        <title>AllCampaigns || SadiaFund</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-orange-400 text-center">
        <Typewriter
          words={['All Campaigns']}
          loop={5}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
        ({campaigns.length})
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleSort}
          className="btn bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded"
        >
          Sort by Amount ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      {/* Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="border rounded-lg shadow-lg p-4 border-orange-700">
            {/* Image */}
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            {/* Title */}
            <h2 className="text-xl font-bold mb-2">{campaign.title}</h2>
            {/* Description */}
            <p className="text-gray-600 mb-4">
              {campaign.description.length > 80
                ? `${campaign.description.slice(0, 80)}...`
                : campaign.description}
            </p>
            {/* Details */}
            <div className="text-gray-700 text-sm mb-4">
              <p>
                <span className="font-bold">Type:</span> {campaign.type}
              </p>
              <p>
                <span className="font-bold">Amount:</span> ${campaign.minimumDonation}
              </p>
              <p>
                <span className="font-bold">Name:</span> {campaign.name}
              </p>
              <p>
                <span className="font-bold">Email:</span> {campaign.email}
              </p>
              <p>
                <span className="font-bold">End Date:</span> {campaign.deadline}
              </p>
            </div>
            {/* Action */}
            <Link
              to={`/campaigns/${campaign._id}`}
              className="btn bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded w-full text-center"
            >
              See More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCampaigns;
