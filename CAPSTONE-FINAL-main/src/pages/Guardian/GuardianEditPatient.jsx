import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

const GuardianEditPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy patient data (in a real app, fetch the patient data from an API)
  const [patient, setPatient] = useState({
    firstName: 'John',
    middleInitial: 'D.',
    lastName: 'Doe',
    sex: 'Male',
    birthdate: '2019-01-01',
    age: 5,
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSave = () => {
    console.log('Updated Patient Data:', patient);
    // Add logic to save the updated patient details (e.g., API call)
    navigate(`/patients/view/${id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100 relative">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 z-10"
      >
        <IoArrowBack className="text-lg" />
      </button>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-xl font-semibold mb-6">Edit Patient Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-semibold">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={patient.firstName}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Middle Initial:</label>
            <input
              type="text"
              name="middleInitial"
              value={patient.middleInitial}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={patient.lastName}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Sex:</label>
            <select
              name="sex"
              value={patient.sex}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Birthdate:</label>
            <input
              type="date"
              name="birthdate"
              value={patient.birthdate}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Age:</label>
            <input
              type="number"
              name="age"
              value={patient.age}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
        </form>
        <div className="flex justify-center mt-6"> 
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuardianEditPatient;