import React, { useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "johndoe@example.com", role: "Guardian", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", role: "Pediatrician", status: "Pending" },
    { id: 3, name: "Alice Johnson", email: "alicejohnson@example.com", role: "Guardian", status: "Pending" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("name"); // Default sorting by Name
  const [sortOrder, setSortOrder] = useState("asc"); // Ascending by default
  const [statusFilter, setStatusFilter] = useState("");

  // Function to handle Accept action
  const handleAccept = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: "Accepted" } : user
      )
    );
  };

  // Function to handle Decline action
  const handleDecline = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: "Declined" } : user
      )
    );
  };

  // Function to toggle ascending/descending order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Function to handle sorting
  const sortUsers = (users) => {
    let sortedUsers;
    switch (sortType) {
      case "name":
        sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "role":
        sortedUsers = [...users].sort((a, b) => a.role.localeCompare(b.role));
        break;
      default:
        sortedUsers = users;
    }

    // Handle ascending/descending order
    return sortOrder === "asc" ? sortedUsers : sortedUsers.reverse();
  };

  // Apply filters and sorting
  const filteredUsers = sortUsers(users)
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) =>
      statusFilter ? user.status === statusFilter : true
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Users Management</h1>

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

        {/* Ascending/Descending Toggle Button */}
        <button
          onClick={toggleSortOrder}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
        >
          {sortOrder === "asc" ? (
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
          <option value="name">Name</option>
          <option value="role">Role</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
        </select>
      </div>

      {/* Users Table */}
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr
              key={user.id}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"} hover:bg-green-50 transition-all`}
            >
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className={`p-4 font-semibold ${getStatusColor(user.status)}`}>
                {user.status}
              </td>
              <td className="p-4 text-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleAccept(user.id)}
                  disabled={user.status !== "Pending"}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleDecline(user.id)}
                  disabled={user.status !== "Pending"}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to assign status colors
const getStatusColor = (status) => {
  switch (status) {
    case "Accepted":
      return "text-green-600";
    case "Declined":
      return "text-red-600";
    default:
      return "text-gray-700";
  }
};

export default AdminUsers;
