import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Password e Confirm Password precisam ser iguais.");
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
        setPasswordError(data.error || data.message || "Erro ao criar usuário");
        return;
      }

      alert(data.message || "Usuário criado com sucesso!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
      navigate("/login");
    } catch (error) {
      console.error("Erro no signup:", error);
      setPasswordError("Erro de rede, tente novamente.");
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div>
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
            <div>
              <label htmlFor="email">Email:</label> <br />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label> <br />
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
              />
            </div>
            {passwordError && <p>{passwordError}</p>}
            <div>
              <label htmlFor="confirmPassword">Confirm your password:</label>
              <br />
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
              ></input>
            </div>
            <br />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;

