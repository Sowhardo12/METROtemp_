
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // We will create this axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken')); // Load token from storage
  const [loading, setLoading] = useState(true); // To check initial auth status

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
        try {
          // Fetch user details if token exists
          const response = await api.get('/users/me/');
          setUser(response.data);
        } catch (error) {
          // Token is invalid or expired
          console.error("Token verification failed:", error);
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false); // Finished loading initial auth state
    };
    verifyUser();
  }, []); 

  const login = (userData, authToken) => {
    localStorage.setItem('authToken', authToken);
    setToken(authToken);
    setUser(userData);
    api.defaults.headers.common['Authorization'] = `Token ${authToken}`;
  };

  const logout = async () => {
     try {
       // Optionally call the backend logout endpoint
       if (token) {
          await api.post('/users/logout/');
       }
     } catch (error) {
        console.error("Logout failed on backend:", error);
        // Still proceed with frontend logout even if backend call fails
     } finally {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
     }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user, // True if user object exists
    loading, // Expose loading state
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};