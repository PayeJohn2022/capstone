import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const ViewPatient = () => {
  const navigate = useNavigate();

  // Dummy patient data
  const patient = {
    id: 1,
    firstName: 'John',
    middleInitial: 'D.',
    lastName: 'Doe',
    sex: 'Male',
    birthdate: '2019-01-01',
    age: 5,
  };

  // Navigate back to the previous page
  const handleBack = () => {
    navigate('/pediatrician/patients');
  };

  // Navigate to the edit page
  const handleEdit = () => {
    navigate(`/patients/edit/${patient.id}`);
  };

  // Handle patient deletion
  const handleDelete = () => {
    console.log(`Deleted patient with ID: ${patient.id}`);
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
    <div className="flex flex-col items-center">
      {/* Placeholder for profile picture */}
      <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-6">
        <span className="text-sm text-gray-500">PLACEHOLDER</span>
      </div>

      {/* Patient Information */}
      <div className="text-left w-full">
        <p className="mb-2">
          <span className="font-semibold">Patient ID:</span> {patient.id}
        </p>
        <p className="mb-2">
          <span className="font-semibold">First Name:</span>{' '}
          <span className="font-bold">{patient.firstName}</span>
        </p>
        <p className="mb-2">
          <span className="font-semibold">Middle Initial:</span>{' '}
          <span className="font-bold">{patient.middleInitial}</span>
        </p>
        <p className="mb-2">
          <span className="font-semibold">Last Name:</span>{' '}
          <span className="font-bold">{patient.lastName}</span>
        </p>
        <p className="mb-2">
          <span className="font-semibold">Sex:</span>{' '}
          <span className="font-bold">{patient.sex}</span>
        </p>
        <p className="mb-2">
          <span className="font-semibold">Birthdate:</span>{' '}
          <span className="font-bold">{patient.birthdate}</span>
        </p>
        <p className="mb-2">
          <span className="font-semibold">Age:</span>{' '}
          <span className="font-bold">{patient.age}</span>
        </p>
      </div>

      {/* Action Buttons
      <div className="flex justify-between w-full mt-6">
        <button
          onClick={handleEdit}
          className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div> */}
    </div>
  </div>
</div>
  );
};

export default ViewPatient;
