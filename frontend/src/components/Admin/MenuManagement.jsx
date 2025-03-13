import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MenuManagement.css";

const API_URL = "http://localhost:5000";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null, // File object
    available: true,
  });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Fetch menu items from the backend
  const fetchMenuItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/menu`);
      setMenuItems(res.data);
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewItem((prev) => ({ ...prev, image: file }));
  };

  // Add or edit menu item
  const saveMenuItem = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);
      formData.append("description", newItem.description);
      formData.append("category", newItem.category);
      formData.append("available", newItem.available);
      if (newItem.image) formData.append("image", newItem.image);

      if (editItem) {
        await axios.put(`${API_URL}/menu/${editItem._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axios.post(`${API_URL}/menu`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      }

      setNewItem({ name: "", price: "", description: "", category: "", image: null, available: true });
      setEditItem(null);
      fetchMenuItems();
    } catch (error) {
      console.error("Error saving menu item", error);
    }
  };

  // Delete menu item
  const deleteMenuItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/menu/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting menu item", error);
    }
  };

  // Toggle availability
  const toggleAvailability = async (id, currentStatus) => {
    try {
      await axios.put(`${API_URL}/menu/${id}`, { available: !currentStatus });
      fetchMenuItems();
    } catch (error) {
      console.error("Error toggling availability", error);
    }
  };

  // Edit an item
  const handleEdit = (item) => {
    setEditItem(item);
    setNewItem({ ...item, image: null });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Menu Management</h2>

      {/* Add/Edit Form */}
      <div className="card p-3 mb-3">
        <h4>{editItem ? "Edit Item" : "Add New Item"}</h4>
        <input type="text" className="form-control mb-2" name="name" placeholder="Item Name" value={newItem.name} onChange={handleInputChange} />
        <input type="number" className="form-control mb-2" name="price" placeholder="Price" value={newItem.price} onChange={handleInputChange} />
        <textarea className="form-control mb-2" name="description" placeholder="Description" value={newItem.description} onChange={handleInputChange}></textarea>
        <select className="form-control mb-2" name="category" value={newItem.category} onChange={handleInputChange}>
          <option value="">Select Category</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Beverage">Beverage</option>
          <option value="Dessert">Dessert</option>
        </select>
        <input type="file" className="form-control mb-2" onChange={handleImageUpload} />
        {editItem ? (
          <button className="btn btn-primary" onClick={saveMenuItem}>Save Changes</button>
        ) : (
          <button className="btn btn-success" onClick={saveMenuItem}>Add Item</button>
        )}
      </div>

      {/* Menu Items List (Scrollable) */}
      <div className="menu-container">
        <div className="row">
          {menuItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-3">
              <div className="card">
                {item.image && <img src={`${API_URL}${item.image}`} className="card-img-top" alt={item.name} />}
                <div className="card-body text-center">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className={`card-text ${item.available ? "text-success" : "text-danger"}`}>
                    {item.available ? "Available" : "Not Available"}
                  </p>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-danger me-2" onClick={() => deleteMenuItem(item._id)}>Delete</button>
                  <button className="btn btn-secondary" onClick={() => toggleAvailability(item._id, item.available)}>
                    {item.available ? "Set Unavailable" : "Set Available"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
