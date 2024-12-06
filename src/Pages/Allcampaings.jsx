import React, { useState, useEffect, useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';
import { Typewriter } from 'react-simple-typewriter';

const AllCampaigns = () => {
  const { user } = useContext(AuthContex);
  const [loading, setLoading] = useState(true);
  const campaigns = useLoaderData();

  useEffect(() => {
    // Simulating a 2-second delay for spinner
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin border-4 border-t-4 border-orange-500 rounded-full w-16 h-16 mb-6"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-400 text-center">
        <Typewriter
          words={['All Campaigns']}
          loop={5}
          cursor
          cursorStyle='_'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
        ({campaigns.length})
      </h1>

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
