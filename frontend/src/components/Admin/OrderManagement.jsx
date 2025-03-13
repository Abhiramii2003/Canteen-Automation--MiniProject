import React, { useState } from "react";
import Sidebar from "./Sidebar";
// Create this for custom styles if needed

const OrderManagement = () => {
 // Sample orders data
 const [orders, setOrders] = useState([
   { id: 1, customer: "John Doe", item: "Burger", status: "Pending" },
   { id: 2, customer: "Jane Smith", item: "Pizza", status: "Preparing" },
   { id: 3, customer: "Alice Brown", item: "Pasta", status: "Completed" },
 ]);

 // Function to update order status
 const updateStatus = (id, newStatus) => {
   setOrders((prevOrders) =>
     prevOrders.map((order) =>
       order.id === id ? { ...order, status: newStatus } : order
     )
   );
 };

 // Function to delete an order
 const deleteOrder = (id) => {
   setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
 };

 return (
 <>
 <div className="row">
  <div className="col-lg-3">
    <Sidebar/>
  </div>
  <div className=" col-lg-9 container mt-4">
     <h2 className="text-center mb-4">Order Management</h2>
     <table className="table table-bordered">
       <thead className="table-dark">
         <tr>
           <th>ID</th>
           <th>Customer</th>
           <th>Item</th>
           <th>Status</th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>
         {orders.map((order) => (
           <tr key={order.id}>
             <td>{order.id}</td>
             <td>{order.customer}</td>
             <td>{order.item}</td>
             <td>
               <select
                 className="form-select"
                 value={order.status}
                 onChange={(e) => updateStatus(order.id, e.target.value)}
               >
                 <option value="Pending">Pending</option>
                 <option value="Preparing">Preparing</option>
                 <option value="Completed">Completed</option>
               </select>
             </td>
             <td>
               <button
                 className="btn btn-danger"
                 onClick={() => deleteOrder(order.id)}
               >
                 Delete
               </button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 </div>
 </>
 );
};

export default OrderManagement;