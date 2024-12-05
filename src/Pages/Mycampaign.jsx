import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';


const Mycampaign = () => {
  const campaigns = useLoaderData();

  // Handle Delete Button Click
  const handleDelete = async (campaignId) => {
     
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/campaigns/${campaignId}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your campaign has been deleted.", "success");
              // Update the campaigns list in UI
              const remaining = campaigns.filter((data) => data._id !== campaignId);
              campaigns.splice(0, campaigns.length, ...remaining);
            }
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to delete the campaign.", "error");
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">All Campaigns ({campaigns.length})</h1>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
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
              <td className="px-4 py-2 flex gap-2">
                <Link
                  to={`/donation/${campaign._id}`}
                  className="btn bg-yellow-400 p-2 rounded-md"
                >
                  <FaEdit className="text-3xl font-bold" />
                </Link>
                <button
                  onClick={() => handleDelete(campaign._id)}
                  className="btn bg-red-600 p-2 rounded-md"
                >
                  <RiDeleteBin6Fill className="text-3xl font-bold text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mycampaign;
