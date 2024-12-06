import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContex } from '../Authprovider/Authprovider';
import { Typewriter } from 'react-simple-typewriter';

const MyCampaigns = () => {
  const { user } = useContext(AuthContex);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDonations = async () => {
      try {
        const response = await fetch('https://user-server-side-management-system.vercel.app/donation');
        if (!response.ok) {
          throw new Error('Failed to fetch donations');
        }
        const data = await response.json();

        // Filter data to show only donations added by the current user
        const userDonations = data.filter((donation) => donation.userEmail === user.email);

        setDonations(userDonations);

        // Simulate a delay of 2 seconds to show the spinner
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching donations:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load your donations.',
        });

        // Hide the spinner even if there's an error
        setLoading(false);
      }
    };

    fetchUserDonations();
  }, [user.email]);

  // Handle delete campaign
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://user-server-side-management-system.vercel.app/donation/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            setDonations(donations.filter((donation) => donation._id !== id));
            Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');
          } else {
            throw new Error('Failed to delete the campaign.');
          }
        } catch (error) {
          console.error('Error deleting campaign:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete the campaign.',
          });
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      {loading ? (
        // Show spinner for 2 seconds after fetching the data
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin border-4 border-t-4 border-orange-500 rounded-full w-16 h-16 mb-6"></div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
            <Typewriter
              words={['My Donated Campaigns']}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          {donations.length === 0 ? (
            <p className="text-center text-lg">
              No donations found. Start contributing today!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <div
                  key={donation._id}
                  className="shadow-md rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl text-orange-500 font-bold mb-2">{donation.campaignTitle}</h3>
                    <p className="line-clamp-3">{donation.description}</p>
                    <p className="mt-2">
                      <strong>Minimum Donation:</strong> ${donation.minimumDonation}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {new Date(donation.deadline).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Donated On:</strong> {new Date(donation.donationOn).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleDelete(donation._id)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCampaigns;
