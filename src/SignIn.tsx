import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "./firebase.config";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const git = new GithubAuthProvider();
  const google = new GoogleAuthProvider();
  const apple = new OAuthProvider("apple.com");

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("USER:", result.user);
          alert("Login success ✅");
        }
      })
      .catch((err) => {
        console.error("Redirect error:", err);
      });
  }, []);

  function signUser() {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);

        alert("correct user");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function signGoogle() {
    signInWithRedirect(auth, google).then(() => {
      alert("google");
    });
  }

  function signGitHub() {
    signInWithRedirect(auth, git).then(() => {
      alert("git hub");
    });
  }

  function signApple() {
    signInWithRedirect(auth, apple).then(() => {
      alert("apple");
    });
  }

  return (
    <div className="w-25 border p-2 mx-auto mt-5">
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="form-control mb-2"
        type="text"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="form-control mb-2"
        type="text"
      />
      <button onClick={signUser} className="btn btn-dark mb-2  w-100">
        Sign in
      </button>
      <button onClick={signGoogle} className="btn btn-dark mb-2  w-100">
        signGoogle
      </button>
      <button onClick={signGitHub} className="btn btn-dark mb-2  w-100">
        signGitHub
      </button>
      <button onClick={signApple} className="btn btn-dark mb-2  w-100">
        signApple
      </button>
    </div>
  );
};

export default SignIn;
