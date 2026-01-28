import  { useState } from "react";
import { auth } from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const n = useNavigate();

  const googleP = new GoogleAuthProvider();

  const signUser = () => {
    createUserWithEmailAndPassword(auth, user.email, user.password).then(
      () => {
        n("/");
      },
    );
  };

  function signGoogle() {
    signInWithPopup(auth, googleP).then(() => {
      n("/");
    });
  }

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
      <button onClick={signGoogle}>google</button>
    </div>
  );
};

export default SignUp;
