import React, { useContext } from "react";
import { AuthContex } from "../Authprovider/Authprovider";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddCampaign = () => {
  const { user, displayName } = useContext(AuthContex);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const title = form.title.value;
    const type = form.type.value;
    const description = form.description.value;
    const minimumDonation = Number(form.minimumDonation.value);
    const deadline = form.deadline.value;

    // Use user.email and displayName directly
    const campaign = {
      image,
      title,
      type,
      description,
      minimumDonation,
      deadline,
      email: user.email,
      name: user.displayName,
    };

    // Make POST request to backend
    fetch("https://user-server-side-management-system.vercel.app/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaign),
    })
      .then((res) => res.json())
      .then((data) => {
        // On successful campaign creation, show SweetAlert
        Swal.fire({
          title: "Success!",
          text: "Your campaign has been added successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        });
      })
      .catch((error) => {
        // Show SweetAlert for any error
        Swal.fire({
          title: "Error!",
          text: "There was an error while adding the campaign.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl border-2 border-gray-300 shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#FF851B] mb-8">
          <Typewriter
            words={['Add New Campaign']}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
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
              className="input rounded-none input-bordered w-full"
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
              className="input rounded-none input-bordered w-full"
              required
            />
          </div>

          {/* Campaign Type */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Campaign Type</span>
            </label>
            <select name="type" className="select rounded-none select-bordered w-full" required>
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
              className="textarea rounded-none textarea-bordered w-full"
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
              className="input rounded-none input-bordered w-full"
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
              className="input rounded-none input-bordered w-full"
              required
            />
          </div>

          {/* User Email (Read-only) */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">User Email</span>
            </label>
            <input
              type="email"
              defaultValue={user.email} // Use email from context
              name="email"
              className="input rounded-none input-bordered w-full "
              readOnly
            />
          </div>

          {/* User Name (Read-only) */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">User Name</span>
            </label>
            <input
              type="text"
              defaultValue={user.displayName} // Use displayName from context
              name="name"
              className="input rounded-none input-bordered w-full "
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn rounded-none btn-primary w-full bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white border-none hover:from-[#FFDC00] hover:to-[#FF851B]"
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
