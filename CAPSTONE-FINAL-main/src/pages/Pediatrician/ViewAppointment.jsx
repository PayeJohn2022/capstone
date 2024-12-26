import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'; // Importing the back arrow icon from react-icons

const ViewAppointment = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/pediatrician/appointments'); // Navigate directly to the Appointments page
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
      </div>
    </main>
  );
};

export default ViewAppointment;
