import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminSeatingManagement.css";

const BASE_URL = "http://localhost:5000"; // Update to your backend URL

const AdminSeatingManagement = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetchSeats();
  }, []);

  // Fetch seating data from the backend
  const fetchSeats = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/seats`);
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  // Update seat status in the backend
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${BASE_URL}/seats/${id}`, { status: newStatus });
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat._id === id ? { ...seat, status: newStatus } : seat
        )
      );
    } catch (error) {
      console.error("Error updating seat status:", error);
    }
  };

  // Handle seat selection
  const toggleSeat = (seat) => {
    let newStatus;
    if (seat.status === "available") newStatus = "occupied";
    else if (seat.status === "selected") newStatus = "available";
    else if (seat.status === "occupied") newStatus = "available"; // Now occupied seats can be changed

    updateStatus(seat._id, newStatus);
  };

  return (
    <div className="admin-seating-container">
      <h2 className="admin-seating-title"> Canteen seating</h2>

      {/* Tabs Navigation */}
      <div className="tabs-container">
     
        <div className="tab active">2. Canteen Tables</div>
    
      </div>

      {/* Seating Box */}
      <div className="seating-box">
        <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "15px" }}>
          Canteen Seating
        </p>

        {/* Seating Layout */}
        <div className="seating-layout">
          {[...new Set(seats.map((seat) => seat.table))].map((tableId) => (
            <div key={tableId} className="table-box">
              <p>Table {tableId}</p>
              <div className="seats">
                {seats
                  .filter((seat) => seat.table === tableId)
                  .map((seat) => (
                    <div
                      key={seat._id}
                      className={`seat ${seat.status}`}
                      onClick={() => toggleSeat(seat)}
                    >
                      {seat.number}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item">
            <div className="legend-box legend-available"></div> Available
          </div>
          <div className="legend-item">
            <div className="legend-box legend-selected"></div> Selected
          </div>
          <div className="legend-item">
            <div className="legend-box legend-occupied"></div> Occupied
          </div>
        </div>

        {/* Buttons */}
       
      </div>
    </div>
  );
};

export default AdminSeatingManagement;
