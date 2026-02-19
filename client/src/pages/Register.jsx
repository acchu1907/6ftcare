import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Register.css";


function Register() {
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleRegister = () => {
    // FRONTEND ONLY ROLE BASED REDIRECT
    if (role === "patient") {
      navigate("/patient/dashboard");
    } else if (role === "doctor") {
      navigate("/doctor/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <>
     

      <div className="register-page">
        <div className="register-card">

          <div className="icon-circle">🩺</div>

          <input type="text" placeholder="Enter Full Name" />
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <input type="password" placeholder="Confirm Password" />

          {/* ROLE SELECTION */}
          <div className="role-section">
            <p>Select Role</p>
            <div className="role-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  checked={role === "patient"}
                  onChange={() => setRole("patient")}
                />
                Patient
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  checked={role === "doctor"}
                  onChange={() => setRole("doctor")}
                />
                Doctor
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                Admin
              </label>
            </div>
          </div>

          <button className="register-btn" onClick={handleRegister}>
            Sign Up
          </button>

          <p className="login-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
