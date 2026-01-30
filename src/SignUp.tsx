import { useState } from "react";
import { auth } from "./firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const n = useNavigate();

  const signUser = () => {
    createUserWithEmailAndPassword(auth, user.email, user.password).then(() => {
      n("/sign-in");
    });
  };

  return (
    <div className="w-25 border border-2 mx-auto p-2 mt-4">
      <input
        className="form-control mb-2"
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        placeholder="full name"
        type="text"
      />
      <input
        className="form-control mb-2"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        type="text"
      />
      <input
        className="form-control mb-2"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="text"
      />
      <button className="btn btn-dark w-100" onClick={signUser}>
        sign up
      </button>
      <hr />
      <Link className="btn btn-primary mt-3 w-50 d-block mx-auto" to={"/sign-in"}>Sign in</Link>
    </div>
  );
};

export default SignUp;
