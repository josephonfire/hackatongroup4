import Login from "../components/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";


// Pagina do login do site. 
// Importante: o servidor deve estar rodando na porta 3030 para que a API funcione corretamente

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (
      token &&
      username &&
      username !== 'null' &&
      username !== 'undefined'
    ) {
      navigate(`/profile/${username}`, { replace: true });
    }
  }, [navigate]);

  return (
    <>

      <div className="App">
        <Login /> <br />
      </div>


      <footer className="text-sm text-center">
        <Footer />
      </footer>
    
    </>
  );
}

export default LoginPage;
