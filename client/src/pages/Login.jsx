import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-container">
      <h2>Login to 6ftCare</h2>

      <form className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button className="btn-primary">Login</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
