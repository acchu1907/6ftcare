import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="logo-circle">🩺</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>

      <div className="nav-right">
        <Link to="/login" className="login-btn">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
