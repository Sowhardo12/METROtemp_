
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
   const { isAuthenticated } = useAuth();
  return (
    <div className="text-center">
      <h1>Welcome to the Metro Management System</h1>
      <p>Your efficient solution for managing metro operations.</p>
      <hr />
      {!isAuthenticated && ( // Show buttons only if not logged in
        <div>
            <p>Please login or register to continue.</p>
            <Link to="/login" className="btn btn-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-success">Register</Link>
        </div>
      )}
       {isAuthenticated && ( // Show buttons only if logged in
        <div>
            <p>Go to your dashboard to see your details.</p>
            <Link to="/dashboard" className="btn btn-info">My Dashboard</Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;