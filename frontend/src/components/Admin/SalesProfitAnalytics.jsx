import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";

const SalesAnalytics = () => {
  // Dummy sales data
  const [salesData] = useState([
    { date: "Mon", sales: 1200 },
    { date: "Tue", sales: 2300 },
    { date: "Wed", sales: 1800 },
    { date: "Thu", sales: 3200 },
    { date: "Fri", sales: 4100 },
    { date: "Sat", sales: 2900 },
    { date: "Sun", sales: 3500 },
  ]);

  // Dummy top-selling items data
  const [topItems] = useState([
    { name: "Burger", value: 400 },
    { name: "Pizza", value: 300 },
    { name: "Pasta", value: 250 },
    { name: "Fries", value: 200 },
  ]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
    <div className="row">
      <div className="col-lg-3">
        <Sidebar/>
      </div>
      <div className=" col-lg-9 container-fluid mt-4">
      <h2 className="text-center mb-4">Sales & Profit Analytics 📊</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        {[
          { title: "Total Sales", value: "$15,200", color: "primary" },
          { title: "Revenue", value: "$45,000", color: "success" },
          { title: "Profit", value: "$12,000", color: "danger" },
        ].map((item, index) => (
          <div key={index} className="col-md-4">
            <div className={`card text-white bg-${item.color} p-3 shadow`}>
              <h5>{item.title}</h5>
              <h3>{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Trend Chart */}
      <div className="row">
        <div className="col-md-8">
          <h5>Daily Sales Trend</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Top Selling Items */}
        <div className="col-md-4">
          <h5>Top Selling Items</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topItems}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {topItems.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
      </div>
   </>
  );
};

export default SalesAnalytics;
