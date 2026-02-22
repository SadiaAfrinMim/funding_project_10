import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
  const campaign = useLoaderData();
  const { _id, title, image, description, type, minimumDonation, deadline } = campaign;

  const [preview, setPreview] = useState(image || null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Only append if values changed
    if (e.target.title.value !== title) formData.append("title", e.target.title.value);
    if (e.target.description.value !== description)
      formData.append("description", e.target.description.value);
    if (e.target.type.value !== type) formData.append("type", e.target.type.value);
    if (Number(e.target.minimumDonation.value) !== minimumDonation)
      formData.append("minimumDonation", e.target.minimumDonation.value);
    if (
      e.target.deadline.value &&
      new Date(e.target.deadline.value).toISOString() !== new Date(deadline).toISOString()
    )
      formData.append("deadline", e.target.deadline.value);

    // Only append if user selected a new image
    if (selectedFile) formData.append("image", selectedFile);

    try {
      const res = await fetch(
        `https://user-server-side-management-system.vercel.app/donation/${_id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to update campaign");

      Swal.fire({
        title: "Success!",
        text: "Campaign has been updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating campaign:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the campaign.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <Helmet>
        <title>Update Campaign || SadiaFund</title>
      </Helmet>
      <div className="w-full max-w-3xl border border-gray-300 shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#FF851B] mb-8">
          Update Campaign
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Upload Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full rounded-none"
              onChange={handleImageChange}
            />
            {preview && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Image Preview:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-xs max-h-60 border border-gray-300 rounded"
                />
              </div>
            )}
          </div>

          {/* Campaign Title */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Campaign Title</span>
            </label>
            <input
              type="text"
              name="title"
              className="input rounded-none input-bordered w-full"
              defaultValue={title || ""}
            />
          </div>

          {/* Campaign Type */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Campaign Type</span>
            </label>
            <select
              name="type"
              className="select select-bordered rounded-none w-full"
              defaultValue={type || ""}
            >
              <option value="">Select Type</option>
              <option value="Environment">Environment</option>
              <option value="Education">Education</option>
              <option value="Animal Welfare">Animal Welfare</option>
              <option value="Social Development">Social Development</option>
              <option value="Humanitarian Aid">Humanitarian Aid</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea rounded-none textarea-bordered w-full"
              defaultValue={description || ""}
            />
          </div>

          {/* Minimum Donation */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Minimum Donation Amount</span>
            </label>
            <input
              type="number"
              name="minimumDonation"
              className="input rounded-none input-bordered w-full"
              defaultValue={minimumDonation || 0}
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
              defaultValue={deadline ? new Date(deadline).toISOString().split("T")[0] : ""}
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn rounded-none btn-primary w-full bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white border-none hover:from-[#FFDC00] hover:to-[#FF851B]"
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