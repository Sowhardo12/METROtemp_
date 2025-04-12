
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar'; // We'll create this
import { AuthProvider, useAuth } from './contexts/AuthContext'; // We'll create this
import './App.css'; // You might want some basic CSS

// Wrapper for routes that require authentication
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider> {/* Wrap entire app with AuthProvider */}
      <Router>
        <Navbar /> {/* Display Navbar on all pages */}
        <div className="container mt-3"> {/* Simple container for layout */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
             {/* Redirect unknown paths to home or a 404 page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;