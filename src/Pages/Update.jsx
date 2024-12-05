import React, { useState, useEffect } from 'react';

const Update = ({ _id }) => {
  const [campaign, setCampaign] = useState({
    image: '',
    title: '',
    type: '',
    description: '',
    minimumDonation: '',
    deadline: ''
  });
 

  const [loading, setLoading] = useState(false);

  // Fetch campaign data when the component mounts
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/donates/${_id}`);
        if (!response.ok) throw new Error('Failed to fetch campaign');
        const data = await response.json();
        setCampaign(data); // Set the form fields with fetched data
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [_id]);

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

    setLoading(true);

    // Send PUT request to update the campaign
    fetch(`http://localhost:5000/donates/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCampaign),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Campaign updated:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#FF851B] mb-8">
          Update Campaign
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                   defaultValue={campaign.image}
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
                   defaultValue={campaign.title}
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
                value={campaign.type}
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
                value={campaign.description}
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
                   defaultValue={campaign.minimumDonation}
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
                defaultValue={campaign.deadline}
                required
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
        )}
      </div>
    </div>
  );
};

export default Update;
