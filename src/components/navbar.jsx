import React from 'react';
import { Link } from 'react-router-dom';
import './../style/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Finance Manager</h1>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/income" className="navbar-link">Income</Link>
        <Link to="/expenses" className="navbar-link">Expenses</Link>
        <Link to="/transactions" className="navbar-link">Transactions</Link>
        <Link to="/savings" className="navbar-link">Savings</Link>
      </div>
    </nav>
  );
};

export default Navbar;