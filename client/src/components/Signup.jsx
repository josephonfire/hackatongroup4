import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"; // Importa o ficheiro CSS

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError("The password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Password and Confirm Password must be the same.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3031/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setPasswordError(data.error || data.message || "Error creating user");
        return;
      }

      alert(data.message || "User created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setPasswordError("Network error, please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <div>
            <label htmlFor="email" className="signup-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="signup-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="signup-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
              placeholder="Enter your password"
              className="signup-input"
            />
          </div>
          {passwordError && <p className="signup-error">{passwordError}</p>}
          <div>
            <label htmlFor="confirmPassword" className="signup-label">
              Confirm your password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError("");
              }}
              required
              placeholder="Confirm your password"
              className="signup-input"
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <div className="signup-login-link">
            <p>
              Already have an account? <a href="/">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
