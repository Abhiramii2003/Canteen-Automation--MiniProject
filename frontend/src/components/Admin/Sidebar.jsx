import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
function Sidebar() {
  return (
    <>
      <div className="sidebar">
          <h2>Admin Panel</h2>
          <nav>
            <Link to="/admin-profit">Analytics</Link>
            <Link to="/admin-orders">Manage Orders</Link>
            <Link to="/admin-user">User Management</Link>
            <Link to="/admin-notification">AdminNotifications</Link>
            <Link to="/seating">Seating</Link>

            <Link to="/admin-menu">Menu</Link>
          </nav>
        </div>
      
    </>
  )
}

export default Sidebar
