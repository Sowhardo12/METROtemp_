// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Call the logout function from context
    navigate('/login'); // Redirect to login page
  };

  // Don't render anything until initial auth check is done
  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom-green mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Metro System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> {/* ms-auto pushes items to the right */}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">
                    Welcome, {user?.name || user?.email}! {/* Display user name or email */}
                  </span>
                </li>
                 <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;