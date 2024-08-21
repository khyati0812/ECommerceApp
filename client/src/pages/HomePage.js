// src/HomePage.js
import React, { useState } from "react";
import "./HomePage.css"; // Import the CSS file for styling
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div className="fade-background">
      <h2>Welcome to Our Store!</h2>
      <p>Discover our latest products and deals.</p>
      <div className="auth-info">
        <h3>Authentication Information</h3>
        <pre>{JSON.stringify(auth, null, 2)}</pre>
      </div>
    </div>
  );
};

export default HomePage;
