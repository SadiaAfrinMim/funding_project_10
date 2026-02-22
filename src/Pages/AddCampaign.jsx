import React, { useContext } from "react";
import { AuthContex } from "../Authprovider/Authprovider";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddCampaign = () => {
  const { user } = useContext(AuthContex);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // 🔹 image file
    const imageFile = form.image.files[0];

    // 🔹 other campaign data (WITHOUT image)
    const campaignData = {
      title: form.title.value,
      type: form.type.value,
      description: form.description.value,
      minimumDonation: Number(form.minimumDonation.value),
      deadline: form.deadline.value,
      email: user.email,
      name: user.displayName,
    };

    // 🔹 FormData (MUST)
    const formData = new FormData();
    formData.append("image", imageFile); // multerUpload.single("image")
    formData.append("data", JSON.stringify(campaignData)); // req.body.data

    try {
      const res = await fetch("https://user-server-side-management-system.vercel.app/campaigns", {
        method: "POST",
        body: formData, // ❌ headers দেবা যাবে না
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Your campaign has been added successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        });
        form.reset();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <Helmet>
        <title>AddCampaign || SadiaFund</title>
      </Helmet>

      <div className="w-full max-w-3xl border-2 border-gray-300 shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#FF851B] mb-8">
          <Typewriter
            words={["Add New Campaign"]}
            loop={5}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ✅ Image Upload */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">
                Campaign Image
              </span>
            </label>

            <div className="border-2 border-dashed border-[#FF851B] p-4 text-center hover:bg-orange-50 transition">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="file-input file-input-bordered w-full rounded-none"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                JPG / PNG • Recommended 1200×630
              </p>
            </div>
          </div>

          {/* Campaign Title */}
          <input
            type="text"
            name="title"
            placeholder="Campaign Title"
            className="input rounded-none input-bordered w-full"
            required
          />

          {/* Campaign Type */}
          <select
            name="type"
            className="select rounded-none select-bordered w-full"
            required
          >
            <option value="">Select Type</option>
            <option value="Environment">Environment</option>
            <option value="Education">Education</option>
            <option value="animal welfare">animal welfare</option>
            <option value="social development">social development</option>
            <option value="humanitarian aid">humanitarian aid</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Campaign Description"
            className="textarea rounded-none textarea-bordered w-full"
            required
          ></textarea>

          {/* Minimum Donation */}
          <input
            type="number"
            name="minimumDonation"
            placeholder="Minimum Donation Amount"
            className="input rounded-none input-bordered w-full"
            required
          />

          {/* Deadline */}
          <input
            type="date"
            name="deadline"
            className="input rounded-none input-bordered w-full"
            required
          />

          {/* User Email */}
          <input
            type="email"
            defaultValue={user.email}
            className="input rounded-none input-bordered w-full"
            readOnly
          />

          {/* User Name */}
          <input
            type="text"
            defaultValue={user.displayName}
            className="input rounded-none input-bordered w-full"
            readOnly
          />

          {/* Submit */}
          <button
            type="submit"
            className="btn rounded-none w-full bg-gradient-to-r from-[#FF851B] to-[#FFDC00] text-white border-none hover:from-[#FFDC00] hover:to-[#FF851B]"
          >
            Add Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;