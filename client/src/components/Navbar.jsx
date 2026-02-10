import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left Icon / Logo */}
      <div className="navbar-logo">
        <span className="logo-circle">🩺</span>
        
      </div>

      {/* Center Menu */}
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link >About Us</Link>
        </li>
        <li>
          <Link to="/appointments">Appointments</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      {/* Right Button */}
      <Link to="/login" className="login-btn">
        Log In
      </Link>
    </nav>
  );
};

export default Navbar;
