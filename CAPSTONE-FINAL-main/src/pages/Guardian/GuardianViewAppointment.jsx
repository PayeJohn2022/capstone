import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'; // Importing the back arrow icon from react-icons

const GuardianViewAppointment = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleEdit = () => {
    // Implement the edit functionality
    console.log('Edit appointment');
  };

  const handleDelete = () => {
    // Implement the delete functionality
    console.log('Delete appointment');
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100 relative">
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 z-10"
      >
        <IoArrowBack className="text-lg" />
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
            <span className="text-sm text-gray-500">PLACEHOLDER</span>
          </div>
        </div>

        <div className="text-gray-700 text-lg mb-4 space-y-2">
          <p><strong>Type:</strong> <span className="font-semibold">Appointment</span></p>
          <p><strong>Guardian Name:</strong> <span className="font-semibold">John Doe</span></p>
          <p><strong>Email:</strong> <span className="font-semibold">johndoe@example.com</span></p>
          <p><strong>Patient Name:</strong> <span className="font-semibold">John D. Doe</span></p>
          <p><strong>Age:</strong> <span className="font-semibold">5</span></p>
          <p><strong>Schedule Date:</strong> <span className="font-semibold">2024-12-31</span></p>
          <p><strong>Schedule Time:</strong> <span className="font-semibold">11:00AM - 12:00PM</span></p>
          <p><strong>Description:</strong> <span className="font-semibold">Colds and fever</span></p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleEdit}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
};

export default GuardianViewAppointment;
