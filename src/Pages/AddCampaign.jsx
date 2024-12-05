import React, { useState } from "react";

const AddCampaign = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const image = from.image.value;
    const title = from.title.value;
    const type = from.type.value;
    const description = from.description.value;
    const minimumDonation = from.minimumDonation.value;
    const deadline = from.deadline.value;


    // Assuming user data is predefined or fetched
    const user = {
      image,
      title,
      type,
      description,
      minimumDonation,
      deadline,

    };

    fetch('http://localhost:5000/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#FF851B] mb-8">
          Add New Campaign
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
              required
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
              required
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
              required
            >
              <option value="">Select Type</option>
              <option value="personal">Personal Issue</option>
              <option value="startup">Startup</option>
              <option value="business">Business</option>
              <option value="creative">Creative Ideas</option>
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
              required
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
              required
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
              required
            />
          </div>


          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">User Email</span>
            </label>
            <input
              type="email"
              defaultValue="user@example.com" // Replace with actual user email
              name="email"
              className="input input-bordered w-full bg-gray-100"
            />
          </div>


          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">User Name</span>
            </label>
            <input
              type="text"
              defaultValue="John Doe" // Replace with actual user name
              name="name"
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white border-none hover:from-[#FFDC00] hover:to-[#FF851B]"
            >
              Add Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
