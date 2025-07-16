import Signup from "../components/Signup";
import NavBarHome from "../components/NavBarHome";
import LogoWithGlow from "../components/logowithGlow";

function SignUpPage() {
  return (
    <>
      <header><NavBarHome /></header>

      <div className=" text-center">
                  {/* LOGOTIPO*/}
                  <LogoWithGlow /></div>

      <div className="App">
        <Signup /> <br />

      </div>
      <footer className=" text-gray-500 text-sm text-center pb-6">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default SignUpPage;
