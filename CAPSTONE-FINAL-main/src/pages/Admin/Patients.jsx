import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPatient = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('firstName'); // Default sort by First Name
  const [sortOrder, setSortOrder] = useState('asc'); // Ascending by default
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patient data (Replace this with an actual API call)
    const fetchPatients = async () => {
      try {
        const response = [
          {
            id: 1,
            firstName: "John",
            middleName: "A.",
            lastName: "Doe",
            sex: "Male",
            birthdate: "1990-05-15",
          },
          {
            id: 2,
            firstName: "Jane",
            middleName: "B.",
            lastName: "Smith",
            sex: "Female",
            birthdate: "1995-11-20",
          },
        ];
        setPatients(response);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Function to handle sorting
  const sortPatients = (patients) => {
    const sortedPatients = [...patients];
    switch (sortType) {
      case 'firstName':
        sortedPatients.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case 'lastName':
        sortedPatients.sort((a, b) => a.lastName.localeCompare(b.lastName));
        break;
      case 'age':
        sortedPatients.sort((a, b) => {
          const ageA = new Date().getFullYear() - new Date(a.birthdate).getFullYear();
          const ageB = new Date().getFullYear() - new Date(b.birthdate).getFullYear();
          return ageA - ageB;
        });
        break;
      case 'sex':
        sortedPatients.sort((a, b) => a.sex.localeCompare(b.sex));
        break;
      case 'birthdate':
        sortedPatients.sort((a, b) => new Date(a.birthdate) - new Date(b.birthdate));
        break;
      default:
        break;
    }

    // Handle ascending/descending order
    return sortOrder === 'asc' ? sortedPatients : sortedPatients.reverse();
  };

  // Apply search filter
  const filteredPatients = sortPatients(patients)
    .filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.sex.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleView = (id) => {
    navigate(`/patients/view/${id}`); // Redirect to AdminViewPatient page
  };

  // Function to toggle ascending/descending order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Patients</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        {/* Search Bar, Sort Order Button, and Sort Dropdown */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by first name, last name, or sex"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />

          {/* Ascending/Descending Toggle Button */}
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
          >
            {sortOrder === 'asc' ? (
              <span className="text-green-500">↑</span>
            ) : (
              <span className="text-green-500">↓</span>
            )}
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="age">Age</option>
            <option value="sex">Sex</option>
            <option value="birthdate">Birthdate</option>
          </select>
        </div>

        {/* Patients Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4">Patient ID</th>
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Middle Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">Sex</th>
              <th className="py-3 px-4">Birthdate</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{patient.id}</td>
                  <td className="py-3 px-4">{patient.firstName}</td>
                  <td className="py-3 px-4">{patient.middleName}</td>
                  <td className="py-3 px-4">{patient.lastName}</td>
                  <td className="py-3 px-4">{patient.sex}</td>
                  <td className="py-3 px-4">{patient.birthdate}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleView(patient.id)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPatient;