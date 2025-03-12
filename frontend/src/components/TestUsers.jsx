import { useEffect, useState } from "react";
import axios from "axios";

const TestUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data)) // Store the response in state
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestUsers;
