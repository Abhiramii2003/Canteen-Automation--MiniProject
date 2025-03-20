import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import Dashboard from "./Dashboard";




const Profile = ({ user }) => {
  return (
    <>
    <div className="container-fluid py-5">
      <Dashboard/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-body text-center">
              {/* Profile Image */}
              <img
                src="https://via.placeholder.com/150" // Replace with user's profile image
                alt="Profile"
                className="rounded-circle img-fluid mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h3 className="card-title">{user?.name || "User Name"}</h3>
              <p className="text-muted">{user?.email || "user@example.com"}</p>
            </div>
            <div className="card-footer text-center bg-light">
              <button className="btn btn-primary me-2">Edit Profile</button>
              <button className="btn btn-danger">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Profile;
