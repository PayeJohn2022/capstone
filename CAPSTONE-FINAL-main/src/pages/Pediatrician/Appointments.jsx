import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fetchAppointments = async () => {
  try {
    const response = await fetch('/api/admin/appointments'); // Replace with your API endpoint
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

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('patient_name');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to load appointments:', error);
      }
    };

    loadAppointments();
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

  const handleDelete = async (appId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const response = await fetch(`/api/admin/appointments/${appId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.app_id !== appId)
          );
          alert('Appointment deleted successfully.');
        } else {
          alert('Failed to delete the appointment.');
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <main className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-10 h-screen">
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 hover:border-blue-500 hover:bg-blue-50"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 hover:border-blue-500 hover:bg-blue-50"
          >
            <option value="">Sort by</option>
            <option value="patient_name">Name</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
          </select>
        </div>

        <div className="flex justify-between items-center text-blue-900 font-semibold text-lg border-b-2 border-blue-300 pb-2">
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
                <div className="flex space-x-4">
                  <button
                    onClick={() => navigate(`/admin/appointment/${appointment.app_id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/admin/edit-appointment/${appointment.app_id}`)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.app_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-blue-800">No appointments available.</p>
        )}
      </div>
    </main>
  );
};

export default Appointments;
