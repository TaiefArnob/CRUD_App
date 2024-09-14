import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
      } catch (error) {
        toast.error('Error fetching users', { position: 'top-right' });
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      toast.success('User deleted successfully', { position: 'top-right' });
      setUsers(users.filter(user => user._id !== userId)); // Update UI after deletion
    } catch (error) {
      toast.error('Error deleting user', { position: 'top-right' });
      console.error('Error:', error);
    }
  };

  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td className="actionButton">
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                  <Link to={`/edit/${user._id}`}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
