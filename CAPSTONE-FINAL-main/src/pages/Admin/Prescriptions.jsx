import React, { useState } from 'react';

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-12-09",
      medication: "Paracetamol",
      dosage: "500mg, twice daily",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-12-08",
      medication: "Ibuprofen",
      dosage: "200mg, three times daily",
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('default');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  const handleSend = (id) => {
    const updatedPrescriptions = prescriptions.map((prescription) =>
      prescription.id === id ? { ...prescription, status: "Sent" } : prescription
    );
    setPrescriptions(updatedPrescriptions);
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortPrescriptions = (prescriptions) => {
    switch (sortType) {
      case 'name':
        return [...prescriptions].sort((a, b) => {
          const compare = a.patientName.localeCompare(b.patientName);
          return sortOrder === 'asc' ? compare : -compare;
        });
      case 'date':
        return [...prescriptions].sort((a, b) => {
          const compare = new Date(a.date) - new Date(b.date);
          return sortOrder === 'asc' ? compare : -compare;
        });
      case 'medication':
        return [...prescriptions].sort((a, b) => {
          const compare = a.medication.localeCompare(b.medication);
          return sortOrder === 'asc' ? compare : -compare;
        });
      default:
        return prescriptions;
    }
  };

  const filteredPrescriptions = sortPrescriptions(prescriptions)
    .filter((prescription) =>
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((prescription) =>
      statusFilter ? prescription.status === statusFilter : true
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Prescriptions</h1>

      {/* Search, Sort, and Filter Controls */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        />

        {/* Sort Order Toggle Button (with arrows) */}
        <button
          onClick={handleSortToggle}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
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
          <option value="name">Patient Name</option>
          <option value="date">Date</option>
          <option value="medication">Medication</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Sent">Sent</option>
        </select>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3 text-left">Patient Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Medication</th>
              <th className="p-3 text-left">Dosage</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id} className="border-t hover:bg-gray-100">
                <td className="p-3">{prescription.patientName}</td>
                <td className="p-3">{prescription.date}</td>
                <td className="p-3">{prescription.medication}</td>
                <td className="p-3">{prescription.dosage}</td>
                <td className={`p-3 text-green-700 font-semibold`}>
                  {prescription.status}
                </td>
                <td className="p-3 text-center">
                  {prescription.status === "Pending" ? (
                    <button
                      onClick={() => handleSend(prescription.id)}
                      className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                      Send
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">Sent</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPrescriptions;
