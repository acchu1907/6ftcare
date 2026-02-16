import "./Login.css";

function Login() {
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

          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <p>
            Don’t have account? <a href="/register">Sign up</a>
          </p>

          <button className="login-btn">Log In</button>

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
