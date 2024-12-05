import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';

const AllCampaigns = () => {
  const { user } = useContext(AuthContex);
  const campaigns = useLoaderData();

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Campaigns</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="border-b hover:bg-gray-50">
                {/* Image */}
                <td className="px-4 py-2">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-20 h-20 object-cover rounded-md mx-auto"
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

                {/* End Date */}
                <td className="px-4 py-2 text-center">{campaign.deadline}</td>

                {/* Action */}
                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/campaigns/${campaign._id}`}
                    className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-white"
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
