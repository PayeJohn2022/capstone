import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getAppointments = async () => {
  try {
    const response = await fetch('/api/appointments'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

const GuardianAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('patient_name');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const sortAppointments = (appointments) => {
    const sortedAppointments = [...appointments];
    switch (sortType) {
      case 'patient_name':
        sortedAppointments.sort((a, b) => a.patient_name.localeCompare(b.patient_name));
        break;
      case 'date':
        sortedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'time':
        sortedAppointments.sort((a, b) => a.time.localeCompare(b.time));
        break;
      default:
        break;
    }

    return sortOrder === 'asc' ? sortedAppointments : sortedAppointments.reverse();
  };

  const filteredAppointments = sortAppointments(appointments).filter(
    (appointment) =>
      appointment.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(appointment.date).toLocaleDateString().includes(searchTerm)
  );

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <main className="flex-1 bg-gradient-to-br from-green-50 to-green-100 p-10 h-screen">
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
          >
            <option value="patient_name">Name</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
          </select>
        </div>

        <div className="flex justify-between items-center text-green-900 font-semibold text-lg border-b-2 border-green-300 pb-2">
          <span>Appointment ID</span>
          <span>Patient Name</span>
          <span>Date</span>
          <span>Time</span>
          <span>Actions</span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div key={appointment.app_id} className="bg-white p-5 rounded-lg shadow mt-4 border border-gray-300">
              <div className="flex justify-between items-center text-gray-700">
                <span>{appointment.app_id}</span>
                <span>{appointment.patient_name}</span>
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                <span>{appointment.time}</span>
                <div>
                  <button
                    onClick={() => navigate(`/appointment/${appointment.app_id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-green-800">No appointments available.</p>
        )}
      </div>
    </main>
  );
};

export default GuardianAppointments;
