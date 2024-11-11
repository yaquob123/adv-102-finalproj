import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './home';
import Destinations from './destinations';
import Booking from './booking';
import Contact from './contact';
import Features from './features';
import Login from './login';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import './App.css'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        localStorage.clear();
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} logout={handleLogout} />
        <nav>
          <ul>
            <li className="brand" style={{ marginRight: '20px' }}>
              <img src={require('./pics/xxx.jpg')} alt="AirMarx Logo" />
              <Link to="/">AirMarx</Link>
            </li>
            <li>
              <input type="text" placeholder="Search..." />
            </li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/booking">Booking</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            ) : (
              <li><Link to="/login"></Link></li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={isLoggedIn ? <Destinations /> : <Navigate to="/login" />} />
          <Route path="/booking" element={isLoggedIn ? <Booking /> : <Navigate to="/login" />} />
          <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/login" />} />
          <Route path="/features" element={isLoggedIn ? <Features /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
