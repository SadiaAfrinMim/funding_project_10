import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const Update = () => {
  const campaign = useLoaderData();
  const { _id, title, image, description, type, minimumDonation, deadline } = campaign;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const title = form.title.value;
    const type = form.type.value;
    const description = form.description.value;
    const minimumDonation = form.minimumDonation.value;
    const deadline = form.deadline.value;
  
    const updatedCampaign = {
      image,
      title,
      type,
      description,
      minimumDonation,
      deadline,
    };
  
    fetch(`http://localhost:5000/donation/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedCampaign),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Campaign updated successfully:', data);
  
        // Show success message using SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Campaign has been updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
  
        // Alternatively, using toast
        // toast.success('Campaign updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating campaign:', error);
  
        // Show error message using SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating the campaign.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#FF851B] mb-8">
          Update Campaign
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image URL */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Image/Thumbnail URL</span>
            </label>
            <input
              type="url"
              name="image"
              placeholder="Enter image URL"
              className="input input-bordered w-full"
              defaultValue={image}
              
            />
          </div>

          {/* Campaign Title */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Campaign Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter campaign title"
              className="input input-bordered w-full"
              defaultValue={title}
             
            />
          </div>

          {/* Campaign Type */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Campaign Type</span>
            </label>
            <select
              name="type"
              className="select select-bordered w-full"
              defaultValue={type} // Correctly set the default value
              
            >
               <option value="">Select Type</option>
              <option value="Environment">Environment</option>
              <option value="Education">Education</option>
              <option value="animal welfare">animal welfare</option>
              <option value="social development">social development</option>
              <option value="humanitarian aid">humanitarian aid</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter campaign description"
              className="textarea textarea-bordered w-full"
              defaultValue={description} // Correctly use defaultValue for textarea
              
            ></textarea>
          </div>

          {/* Minimum Donation */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Minimum Donation Amount</span>
            </label>
            <input
              type="number"
              name="minimumDonation"
              placeholder="Enter minimum donation amount"
              className="input input-bordered w-full"
              defaultValue={minimumDonation}
            
            />
          </div>

          {/* Deadline */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Deadline</span>
            </label>
            <input
              type="date"
              name="deadline"
              className="input input-bordered w-full"
              defaultValue={deadline}
              
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white border-none hover:from-[#FFDC00] hover:to-[#FF851B]"
            >
              Update Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
