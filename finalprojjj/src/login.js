import React from 'react';
import { signInWithGoogle } from './firebase'; // Import signInWithGoogle
import './login.css'; // Import CSS file

const Login = ({ isLoggedIn, logout }) => {
  return (
    <div className="login-container">
      {isLoggedIn ? (
        <>
          <button className="logout-button" onClick={logout}>Logout</button>
          <h2>Welcome back!</h2>
        </>
      ) : (
        <>
          <h2>Please Log In with your Google account to access</h2>
          <button className="google-sign-in-btn" onClick={signInWithGoogle}>
           Log in with Google
          </button>
          <div className="login-message"></div>
        </>
      )}
    </div>
  );
};

export default Login;
