import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MenuManagement.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const API_URL = "http://localhost:5000";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
    image: null,
    available: true,
  });
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
    fetchMenuItems();
  }, []);

  const checkAuthentication = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };

  const fetchMenuItems = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(`${API_URL}/menu`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(res.data);
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewItem((prev) => ({ ...prev, image: file }));
  };

  const saveMenuItem = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);
      formData.append("description", newItem.description);
      formData.append("category", newItem.category);
      formData.append("quantity", newItem.quantity);
      formData.append("available", newItem.available);
      if (newItem.image) formData.append("image", newItem.image);

      if (editItem) {
        await axios.put(`${API_URL}/menu/${editItem._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${API_URL}/menu`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setNewItem({
        name: "",
        price: "",
        description: "",
        category: "",
        quantity: "",
        image: null,
        available: true,
      });
      setEditItem(null);
      setShowModal(false);
      fetchMenuItems();
    } catch (error) {
      console.error("Error saving menu item", error);
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`${API_URL}/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting menu item", error);
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `${API_URL}/menu/${id}`,
        { available: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchMenuItems();
    } catch (error) {
      console.error("Error toggling availability", error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setNewItem({ ...item, image: null });
    setShowModal(true);
  };

  return (
    <div className="menu">
      <div className="row">
        <div className="col-lg-2 bar rounded">
          <Sidebar />
        </div>
        <div className="col-lg-10 container mt-4 p-5">
          <h2 className="text-center">Menu Management</h2>
          <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>Add Item</button>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h4>{editItem ? "Edit Item" : "Add New Item"}</h4>
                <input type="text" className="form-control mb-2" name="name" placeholder="Item Name" value={newItem.name} onChange={handleInputChange} />
                <input type="number" className="form-control mb-2" name="price" placeholder="Price" value={newItem.price} onChange={handleInputChange} />
                <input type="number" className="form-control mb-2" name="quantity" placeholder="Quantity" value={newItem.quantity} onChange={handleInputChange} />
                <textarea className="form-control mb-2" name="description" placeholder="Description" value={newItem.description} onChange={handleInputChange}></textarea>
                <select className="form-control mb-2" name="category" value={newItem.category} onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Homely">Homely</option>
                </select>
                <input type="file" className="form-control mb-2" onChange={handleImageUpload} />
                <button className="btn btn-primary me-2" onClick={saveMenuItem}>Save</button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          )}

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
                      <p><strong>Price:</strong> ₹ {item.price}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
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
      </div>
    </div>
  );
};

export default MenuManagement;
