import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'age', 'guardian', or 'date'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'approved', 'declined'

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
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

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredPatients = patients
    .filter((patient) => {
      const matchesSearchQuery = patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || patient.status === statusFilter;

      return matchesSearchQuery && matchesStatus;
    })
    .sort((a, b) => {
      let compareA, compareB;

      if (sortBy === 'age') {
        compareA = a.age;
        compareB = b.age;
      } else if (sortBy === 'guardian') {
        compareA = a.guardian.toLowerCase();
        compareB = b.guardian.toLowerCase();
      } else if (sortBy === 'date') {
        compareA = new Date(a.date);
        compareB = new Date(b.date);
      } else {
        compareA = a.name.toLowerCase();
        compareB = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return compareA < compareB ? -1 : 1;
      } else {
        return compareA > compareB ? -1 : 1;
      }
    });

  return (
    <main className="flex-1 bg-green-100 p-10 h-screen">
      {/* Search & Sorting Section */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center space-x-2">
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by patient name"
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="name">Patient Name</option>
            <option value="age">Age</option>
            <option value="guardian">Guardian/Parent</option>
            <option value="date">Date</option>
          </select>

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

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
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
                      <button className="text-blue-600 hover:underline">
                        View
                      </button>
                      <button className="text-yellow-500 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete
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
