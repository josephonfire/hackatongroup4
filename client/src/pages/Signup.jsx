import Signup from "../components/Signup";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 


function SignUpPage() {
  return (
    <>
      <div className="App">
        <Signup /> <br />

      </div>
      <footer className="text-sm text-center">
        <Footer />
      </footer>
    </>
  );
}

export default SignUpPage;
