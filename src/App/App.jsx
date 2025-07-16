import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Login";
import SignUpPage from "../Pages/Signup";


function App() {
  return (
    <Router>
      {/* <div>logo</div> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router >
  );
}

export default App;
