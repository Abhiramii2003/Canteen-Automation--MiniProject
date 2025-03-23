import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./OrderManagement.css"; // Import the CSS file

const BASE_URL = "http://localhost:5000"; // Update if backend URL differs

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders`);
      const sortedOrders = sortOrders(response.data);
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const sortOrders = (orders) => {
    return orders.sort((a, b) => (a.status === "Completed" ? 1 : -1));
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${BASE_URL}/orders/${id}`, { status: newStatus });
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        );
        return sortOrders(updatedOrders);
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="order-management">
      <div className="row">
        <div className="col-lg-2">
          <Sidebar />
        </div>
        <div className="col-lg-10 container mt-4">
          <h2 className="text-center order-heading">Order Management</h2>
          <div className="table-responsive">
            <table className="table custom-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>User</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Seats</th>
                  <th>Takeaway</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="token-cell">{order.token}</td>
                    <td>{order.userId}</td>
                    <td>
                      <ul className="order-list">
                        {order.cart.map((item, index) => (
                          <li key={index}>
                            {item.name} - <strong>₹{item.price}</strong>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td><strong>₹{order.totalAmount.toFixed(2)}</strong></td>
                    <td className="payment-mode">{order.paymentMode}</td>
                    <td>
                      {order.seats.length > 0 ? (
                        <ul className="order-list">
                          {order.seats.map((seat, index) => (
                            <li key={index}>
                              Table {seat.table}, Seat {seat.seat}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="no-seats">No seats</span>
                      )}
                    </td>
                    <td className="takeaway-status">{order.takeaway ? "Yes" : "No"}</td>
                    <td>
                      <select
                        className={`form-select status-dropdown status-${order.status.toLowerCase()}`}
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
