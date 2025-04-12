
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Use the service
import { useAuth } from '../contexts/AuthContext'; // To potentially log user in directly

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    nid: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const { name, email, phone_number, nid, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await authService.register({ name, email, phone_number, nid, password, password2 });
      console.log('Registration successful:', response.data);

      if (response.data.user && response.data.token) {
         login(response.data.user, response.data.token); // Use context login function
         navigate('/dashboard'); // Redirect to dashboard after auto-login
         alert('Registration and login successful!');
      } else {
         // Fallback if response format is unexpected
         navigate('/login');
         alert('Registration successful! Please log in.');
      }

    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      // Extract specific errors from backend response if available
      const errors = err.response?.data;
      let errorMessage = 'Registration failed. Please check your input.';
      if (errors) {
          // Combine multiple error messages
          errorMessage = Object.entries(errors)
              .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
              .join('\n');
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card">
         <h4 className="card-header">Register</h4>
         <div className="card-body">
            {error && <div className="alert alert-danger">{error.split('\n').map((line, i) => <p key={i} className="mb-0">{line}</p>)}</div>}
            <form onSubmit={onSubmit}>
              {/* Add form-groups for Bootstrap styling */}
               <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
               </div>
               {/* Repeat for email, phone_number, nid, password, password2 */}
               <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={email} onChange={onChange} required />
               </div>
               <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" name="phone_number" value={phone_number} onChange={onChange} required />
               </div>
                <div className="mb-3">
                    <label className="form-label">NID</label>
                    <input type="text" className="form-control" name="nid" value={nid} onChange={onChange} required />
               </div>
               <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password"
                        className="form-control" name="password" value={password} onChange={onChange} required minLength="8" />
               </div>
               <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password"
                        className="form-control" name="password2" value={password2} onChange={onChange} required />
               </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
         </div>
         <div className="card-footer text-center">
            Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;