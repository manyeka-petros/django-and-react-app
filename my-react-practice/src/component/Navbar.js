import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">🛍️ ShopApp</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-user">Add User</Link></li>
        <li><Link to="/users">View Users</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
