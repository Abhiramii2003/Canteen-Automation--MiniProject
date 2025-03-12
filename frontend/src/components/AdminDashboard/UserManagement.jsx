import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserManagement = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Customer", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Staff", status: "Suspended" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Admin", status: "Active" },
  ]);

  // Function to update user role
  const updateRole = (id, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  // Function to toggle user status (Active/Suspended)
  const toggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" }
          : user
      )
    );
  };

  // Function to delete user
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Management</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className="form-select"
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                >
                  <option value="Customer">Customer</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td>
                <button
                  className={`btn btn-sm ${
                    user.status === "Active" ? "btn-success" : "btn-secondary"
                  }`}
                  onClick={() => toggleStatus(user.id)}
                >
                  {user.status}
                </button>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
