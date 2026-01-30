import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import SignIn from "./SignIn";

const App = () => {
  return (
    <div>
      <div className="w-100 p-4 bg-dark text-white d-flex justify-content-between align-items-center">
        <h1>LOGO</h1>

        <div>
          <Link to={"/sign-up"} className="btn btn-light">
            Sign Up
          </Link>
          <button onClick={() => signOut(auth)} className="btn btn-danger">
            Sign out
          </button>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
