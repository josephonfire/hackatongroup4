import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import '../styles/Login.css';

// Combine LoginPage and Login component
function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (
      token &&
      email &&
      email !== 'null' &&
      email !== 'undefined'
    ) {
      navigate(`/profile/${email}`, { replace: true });
    }
  }, [navigate]);

  // --- Begin Login component code ---
  // Replace this with your actual Login component code
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
  };

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit} className="login-form">
          {/* Add your login form fields here */}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <br />
      </div>
      <footer className="text-sm text-center">
        <Footer />
      </footer>
    </>
  );
}

export default LoginPage;