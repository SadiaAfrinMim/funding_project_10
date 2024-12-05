import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';

const AllCampaigns = () => {
    const {user} = useContext(AuthContex)
  const campaigns  = useLoaderData();

 

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">All Campaigns</h1>
      
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
           
            <th className="px-4 py-2 border">End Date</th>
            <th className='px-4 py-2 border'>Action</th>
           
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id} className="border-b">
              <td className="">
                <img  src={campaign.image} alt={campaign.title} className="w-64 h-20 object-cover rounded-md" />
              </td>
              <td className="px-4 py-2">{campaign.title}</td>
              <td className="px-4 py-2">{campaign.description}</td>
             
              
              <td className="px-4 py-2">{campaign.type}</td>
              <Link to={`/campaigns/${campaign._id}`} className='btn btn-sm bg-yellow-400'>see more</Link>
              
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
};

export default AllCampaigns;
