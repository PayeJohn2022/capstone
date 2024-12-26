import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'; // Importing the back arrow icon from react-icons

const AdminEditAppointment = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin/view-appointment'); // Navigate back to the previous page (GuardianViewAppointment)
  };

  const [formData, setFormData] = useState({
    guardianName: 'John Doe',
    email: 'johndoe@example.com',
    patientName: 'John D. Doe',
    age: 5,
    scheduleDate: '2024-12-31',
    scheduleTime: '11:00AM - 12:00PM',
    description: 'Colds and fever',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Implement the save functionality
    console.log('Saved appointment:', formData);
    navigate(-1); // Navigate back to the previous page after saving
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100 relative">
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
      >
        <IoArrowBack className="text-lg" />
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Edit Appointment</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="guardianName" className="block text-gray-600 font-medium">Guardian Name</label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="patientName" className="block text-gray-600 font-medium">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-600 font-medium">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="scheduleDate" className="block text-gray-600 font-medium">Schedule Date</label>
            <input
              type="date"
              id="scheduleDate"
              name="scheduleDate"
              value={formData.scheduleDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="scheduleTime" className="block text-gray-600 font-medium">Schedule Time</label>
            <input
              type="text"
              id="scheduleTime"
              name="scheduleTime"
              value={formData.scheduleTime}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="e.g., 11:00AM - 12:00PM"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-600 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminEditAppointment;
