import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';
import axios from 'axios';

const AddUser = () => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handledata = (e) => {
    e.preventDefault();

    const userData = {
      first_name,
      last_name,
      email,
      password,
    };

    axios.post('http://localhost:8000/users/use/', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('✅ User created:', response.data);
        // Reset form (optional)
        setFirst_name('');
        setLast_name('');
        setEmail('');
        setPassword('');
        // Navigate to user list
        navigate('/users');
      })
      .catch(error => {
        console.error('❌ Error submitting data:', error.response?.data || error.message);
        alert('Something went wrong while submitting. Check console for details.');
      });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handledata} className="user-form">
        <h2>Signup Form</h2>

        <label>First Name</label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AddUser;
