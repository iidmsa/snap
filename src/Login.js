import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";
import { auth, provider } from "./firebase";
import "./Login.css";
import snapchatLogo from "./snapchat-logo-yellow.jpg";

function Login(props) {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <img className="login__img" src={snapchatLogo} />
      <h2 className="login__text">Snapchat 1.0</h2>
      <Button
        onClick={signIn}
        variant="outlined"
        className="login__signInButton"
      >
        Sign In
      </Button>
    </div>
  );
}

export default Login;
