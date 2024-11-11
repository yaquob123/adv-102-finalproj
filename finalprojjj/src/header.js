import React from 'react';
import './header.css';
import { signInWithGoogle } from './firebase'; 
const Header = ({ isLoggedIn }) => {
  
  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <header>
      <h1>Travel Booking</h1>
      {isLoggedIn && (
        <p>You're currently logged in as {localStorage.getItem("name")}</p>
      )}
      <nav>
        <ul className="header-links">
          <li>
            {!isLoggedIn && (
              <button className="google-sign-in-link" onClick={handleSignInWithGoogle}>Log In with Google</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
