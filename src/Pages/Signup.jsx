import Signup from "./components/Signup";


function SignUpPage() {
  return (
    <>
      <div className="App">
        <Signup /> <br />

      </div>
      <footer className=" text-gray-500 text-sm text-center pb-6">
        © {new Date().getFullYear()} ROI Tracker created by Group 4 - Bytes4Future
      </footer>
    </>
  );
}

export default SignUpPage;
