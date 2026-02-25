import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Register.css";

function Register() {
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registered successfully");
      navigate("/login");

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="register-card">

          <div className="icon-circle">🩺</div>

          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

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