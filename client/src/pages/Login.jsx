import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    // Save token + role
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    // Redirect based on role
    
    if (res.data.role === "patient") navigate("/patient/dashboard"); 
    //fixed navigation Might be wrong too Let's take a look at this later


    if (res.data.role === "doctor") navigate("/doctor");
    if (res.data.role === "admin") navigate("/admin");

  } catch (err) {
    alert("Login failed");
  }
};
  return (
    <div className="login-container">
      
      {/* LEFT SECTION */}
      <div className="login-left">
        <p>
          <strong>6FeetCare</strong> offers seamless healthcare with expert
          services in women's health, men's health, addiction prevention,
          and wellness—supporting you at every step.
        </p>

        <img
          src="/image6.png"
          alt="Doctors"
          className="doctors-image"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">

        <div className="login-box">

          <a href="/" className="skip">Skip</a>

          <div className="icon-circle">🩺</div>

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

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <p>
            Don’t have account? <a href="/register">Sign up</a>
          </p>

          <button className="login-btn" onClick={handleLogin}> Log In </button>

          <p className="or">or</p>

          <div className="social-icons">
            <img src="/googleicon.png" alt="Google" />
          
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;
