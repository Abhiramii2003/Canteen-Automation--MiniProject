import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Burger", price: 5, image: "" },
    { id: 2, name: "Pizza", price: 8, image: "" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", price: "", image: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addMenuItem = () => {
    if (!newItem.name || !newItem.price) return;
    setMenuItems([...menuItems, { ...newItem, id: Date.now() }]);
    setNewItem({ name: "", price: "", image: "" });
  };

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Menu Management</h2>
      
      <div className="card p-3 mb-3">
        <h4>Add New Item</h4>
        <input type="text" className="form-control mb-2" name="name" placeholder="Item Name" value={newItem.name} onChange={handleInputChange} />
        <input type="number" className="form-control mb-2" name="price" placeholder="Price" value={newItem.price} onChange={handleInputChange} />
        <input type="file" className="form-control mb-2" onChange={handleImageUpload} />
        {newItem.image && <img src={newItem.image} alt="Preview" className="img-thumbnail mb-2" style={{ maxWidth: "150px" }} />}
        <button className="btn btn-success" onClick={addMenuItem}>Add Item</button>
      </div>
      
      <div className="row">
        {menuItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="card">
              {item.image && <img src={item.image} className="card-img-top" alt={item.name} />}
              <div className="card-body text-center">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <button className="btn btn-danger" onClick={() => deleteMenuItem(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
