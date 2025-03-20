import React, { useState, useEffect } from "react";
import { BellFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminNotifications.css";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock API Call - Replace with real API fetch
    setNotifications([
      { id: 1, message: "New order received!" },
      { id: 2, message: "Order #1023 has been completed." },
      { id: 3, message: "Stock running low on ingredients." },
    ]);
  }, []);

  return (
    <div className="container mt-4">
      {/* Notifications */}
      <div className="card shadow-sm p-3 mb-3 bg-white rounded">
        <div className="card-header d-flex align-items-center">
          <BellFill className="me-2" /> <strong>Admin Notifications</strong>
        </div>
        <div className="card-body">
          {notifications.map((notif) => (
            <div key={notif.id} className="alert alert-info py-2 mb-2">
              {notif.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;

