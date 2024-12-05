import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Mycampaign = () => {
  const campaigns = useLoaderData();
  const navigate = useNavigate(); // To navigate programmatically



  // Handle Delete Button Click
  const handleDelete = async (campaignId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/campaigns/${campaignId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          toast.success('Campaign deleted successfully!');
          // Optionally, you can refetch the campaigns or remove the deleted campaign from the state
          // e.g., update campaigns list
        } else {
          toast.error('Failed to delete campaign');
        }
      } catch (error) {
        alert('An error occurred while deleting the campaign');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">All Campaigns{campaigns.length}</h1>
      
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id} className="border-b">
              <td className="px-4 py-2">
                <img 
                  src={campaign.image} 
                  alt={campaign.title} 
                  className="w-64 h-20 object-cover rounded-md" 
                />
              </td>
              <td className="px-4 py-2">{campaign.title}</td>
              <td className="px-4 py-2">{campaign.description}</td>
              <td className="px-4 py-2">{campaign.type}</td>
              <td className="px-4 py-2">
              
                <td className="join join-vertical">
  <Link  to={`/donation/${campaign._id}`}  className="btn join-item bg-yellow-400"><FaEdit className='text-3xl font-bold' /></Link>
  
  <Link   onClick={() => handleDelete(campaign._id)} className="btn join-item bg-red-600"><RiDeleteBin6Fill  className='text-3xl font-bold text-white'/></Link>
</td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mycampaign;
