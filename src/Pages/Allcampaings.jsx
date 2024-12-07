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
    <div className="container mx-auto mt-10 px-4">
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

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="border-b hover:bg-gray-50">
                {/* Image */}
                <td className="py-2">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-40 h-20 object-cover rounded-md mx-auto"
                  />
                </td>

                {/* Title */}
                <td className="px-4 py-2 text-center">{campaign.title}</td>

                {/* Description */}
                <td className="px-4 py-2 text-center">
                  {campaign.description.length > 30
                    ? `${campaign.description.slice(0, 30)}...`
                    : campaign.description}
                </td>

                {/* Type */}
                <td className="px-4 py-2 text-center">{campaign.type}</td>

                {/* Amount */}
                <td className="px-4 py-2 text-center">${campaign.minimumDonation}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center">{campaign.name}</td>
                <td className="px-4 py-2 text-center">{campaign.email}</td>

                {/* End Date */}
                <td className="px-4 py-2 whitespace-nowrap text-center">{campaign.deadline}</td>

                {/* Action */}
                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/campaigns/${campaign._id}`}
                    className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 whitespace-nowrap text-white"
                  >
                    See More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCampaigns;
