import React, { useState, useEffect } from "react";
import { BellFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserNotificationsAndRecommendations.css";

const UserNotificationsAndRecommendations = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock API Call - Replace with real API fetch
    setNotifications([
      { id: 1, message: "Your order is being prepared." },
      { id: 2, message: "Your table is now available." },
      { id: 3, message: "Special discount on your next order!" },
    ]);
  }, []);

  return (
    <div className="container mt-4">
      {/* Notifications */}
      <div className="card shadow-sm p-3 mb-3 bg-white rounded">
        <div className="card-header d-flex align-items-center">
          <BellFill className="me-2" /> <strong>User Notifications</strong>
        </div>
        <div className="card-body">
          {notifications.map((notif) => (
            <div key={notif.id} className="alert alert-primary py-2 mb-2">
              {notif.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserNotificationsAndRecommendations;
