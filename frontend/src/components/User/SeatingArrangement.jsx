import React, { useState } from "react";
import "./SeatingArrangement.css"; // Custom styles
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";

const SeatingArrangement = () => {
  const rows = 5; // Number of rows
  const cols = 6; // Number of columns

  // Initial seat status (false = available, true = booked)
  const [seats, setSeats] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );

  // Handle seat click (toggle booking)
  const toggleSeat = (row, col) => {
    setSeats((prevSeats) =>
      prevSeats.map((r, i) =>
        r.map((seat, j) => (i === row && j === col ? !seat : seat))
      )
    );
  };

  return (
    <>
    <div className="container-fluid py-5">
      <Dashboard/>
    <div className="container mt-4">
      <h2 className="text-center mb-4">Seating Arrangement</h2>
      <div className="d-flex justify-content-center">
        <div className="seat-grid">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="d-flex">
              {row.map((seat, colIndex) => (
                <div
                  key={colIndex}
                  className={`seat ${seat ? "booked" : "available"}`}
                  onClick={() => toggleSeat(rowIndex, colIndex)}
                >
                  {rowIndex + 1}-{colIndex + 1}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default SeatingArrangement;
