import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link, useLoaderData } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import { AuthContex } from "../Authprovider/Authprovider";
import { Helmet } from "react-helmet-async";

const Mycampaign = () => {
  
  
  const { user } = useContext(AuthContex); // Get user data from context
  const campaignsData = useLoaderData(); // Data loaded from the server
  const [campaigns, setCampaigns] = useState(campaignsData);

  // Filter campaigns to only include those created by the logged-in user
  const userCampaigns = campaigns.filter((campaign) => campaign.email === user.email);

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
        fetch(`https://user-server-side-management-system.vercel.app/campaigns/${campaignId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your campaign has been deleted.", "success");
              // Update the campaigns list in UI by filtering out the deleted campaign
              const remainingCampaigns = campaigns.filter(
                (campaign) => campaign._id !== campaignId
              );
              setCampaigns(remainingCampaigns); // Update the state to reflect the UI change
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
      <Helmet>
  <title>MyCampaigns || SadiaFund</title>
</Helmet>
      <h1 className="text-3xl text-orange-500 font-bold mb-6">
        <Typewriter
          words={["My Campaigns"]}
          loop={5}
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />{" "}
        ({userCampaigns.length})
      </h1>

     

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">user</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userCampaigns.map((campaign) => (
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
              <td className="px-4 py-2">{campaign.email}</td>
              <td className="px-4 py-2">{campaign.type}</td>
             
              <td className="px-4 py-2 flex gap-2">
                {/* Only show Edit/Delete buttons for the current user's campaigns */}
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
                <Link  className="btn bg-orange-500 p-2 rounded-md" to={`/campaigns/${campaign._id}`} >
                  <FaEye className="text-3xl bg-orange-500 font-bold text-white"></FaEye>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mycampaign;
