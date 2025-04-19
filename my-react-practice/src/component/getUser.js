import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './getUser.css'; // Import external CSS file for styling

const GetUser = () => {
  // State to store fetched user list
  const [users, setUsers] = useState([]);
  
  // State to keep track of which user is being edited
  const [editingUser, setEditingUser] = useState(null);
  
  // State to handle form data for updating user
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  // Base URL of the Django API endpoint
  const apiBase = 'http://localhost:8000/users/use/'; // Replace with your actual Django API

  // Fetch users from API when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API
  const fetchUsers = () => {
    axios.get(apiBase)
      .then(response => {
        setUsers(response.data); // Update the users state
      })
      .catch(error => {
        console.error('Users not found', error); // Log any errors
      });
  };

  // Function to handle user deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`${apiBase}${id}/`)
        .then(() => {
          fetchUsers(); // Refresh the user list after deletion
        })
        .catch(err => {
          console.error('Delete failed:', err);
        });
    }
  };

  // Function to prepare form with existing user data for editing
  const handleEdit = (user) => {
    setEditingUser(user.id); // Set the user to be edited
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password
    });
  };

  // Function to handle user update (PUT request)
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form reload
    axios.put(`${apiBase}${editingUser}/`, formData)
      .then(() => {
        setEditingUser(null); // Reset editing mode
        fetchUsers();         // Refresh the user list
      })
      .catch(err => {
        console.error('Update failed:', err);
      });
  };

  return (
    <div className="user-list-wrapper">
      <h2>Registered Users</h2>

      {/* Displaying list of users */}
      {users.map(user => (
        <ul key={user.id} className="user-card">
          <li><strong>First Name:</strong> {user.first_name}</li>
          <li><strong>Last Name:</strong> {user.last_name}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Password:</strong> {user.password}</li>
          
          {/* Button to edit user */}
          <button onClick={() => handleEdit(user)}>Edit</button>
          
          {/* Button to delete user */}
          <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
        </ul>
      ))}

      {/* Update form appears only when editing */}
      {editingUser && (
        <form onSubmit={handleUpdate} className="update-form">
          <h3>Update User</h3>

          {/* Input for first name */}
          <input
            type="text"
            value={formData.first_name}
            placeholder="First Name"
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
          
          {/* Input for last name */}
          <input
            type="text"
            value={formData.last_name}
            placeholder="Last Name"
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
          
          {/* Input for email */}
          <input
            type="email"
            value={formData.email}
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          
          {/* Input for password */}
          <input
            type="text"
            value={formData.password}
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          {/* Save and cancel buttons */}
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default GetUser;
