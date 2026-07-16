import "./Auth.css";
import { useState } from "react";
import { API_URL } from "./config";

function Signup({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.message) {
        alert("Signup successful");
        switchToLogin();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Get started with DemoGPT</p>

        <form className="auth-form" onSubmit={handleSignup}>
          <input
            className="auth-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <span className="auth-link" onClick={switchToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;