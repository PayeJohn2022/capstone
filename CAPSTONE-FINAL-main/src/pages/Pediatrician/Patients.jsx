import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // ascending or descending
  const [sortBy, setSortBy] = useState('name'); // name, age, or guardian

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (!email) {
          throw new Error('Guardian email is missing');
        }

        const response = await axios.get(`http://localhost:5000/api/patient/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPatients(response.data.patients);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
        setError('Failed to fetch patients. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOrderToggle = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredPatients = patients
    .filter((patient) => {
      return (
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.guardian.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      const compareValueA = a[sortBy].toString().toLowerCase();
      const compareValueB = b[sortBy].toString().toLowerCase();

      if (sortOrder === 'asc') {
        return compareValueA < compareValueB ? -1 : 1;
      } else {
        return compareValueA > compareValueB ? -1 : 1;
      }
    });

  return (
    <main className="flex-1 bg-gradient-to-br from-green-50 to-green-100 p-10 h-screen">
      {/* Search & Sorting Section */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <div className="flex items-center space-x-2">
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search"
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Ascending/Descending Button */}
          <button
            onClick={handleSortOrderToggle}
            className="p-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {sortOrder === 'asc' ? (
              <span className="text-green-600">↑</span>
            ) : (
              <span className="text-green-600">↓</span>
            )}
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="guardian">Guardian</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white p-5 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-lg text-green-800">Loading patients...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : filteredPatients.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left">Patient ID</th>
                <th className="py-3 px-4 text-left">Patient Name</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Guardian/Parent</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-green-50">
                  <td className="py-2 px-4">{patient.id}</td>
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">{patient.age}</td>
                  <td className="py-2 px-4">{patient.guardian}</td>
                  <td className="py-2 px-4">{patient.email}</td>
                  <td className="py-2 px-4">{patient.address}</td>
                  <td className="py-2 px-4">
                    <div className="flex space-x-2">
                      {/* View button */}
                      <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-green-800">No patients found.</p>
        )}
      </div>
    </main>
  );
};

export default Patients;