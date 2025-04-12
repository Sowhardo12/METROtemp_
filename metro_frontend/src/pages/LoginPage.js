
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook
import authService from '../services/authService';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      console.log('Login successful:', response.data);
      if (response.data.user && response.data.token) {
         login(response.data.user, response.data.token); // Update auth state using context function
         navigate('/dashboard'); // Redirect to dashboard on successful login
      } else {
         // Handle unexpected response format
         setError('Login failed: Invalid response from server.');
         setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Login failed. Check credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 mt-5">
       <div className="card">
         <h4 className="card-header">Login</h4>
         <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                 {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
         </div>
          <div className="card-footer text-center">
            Don't have an account? <Link to="/register">Register here</Link>
         </div>
       </div>
    </div>
  );
}

export default LoginPage;