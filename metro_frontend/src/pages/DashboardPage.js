
import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook

function DashboardPage() {
  const { user, loading } = useAuth(); // Get user and loading state from context

  if (loading) {
    return <p>Loading user data...</p>; // Show loading state
  }

  if (!user) {
     
     return <p>User not found. Please log in.</p>;
  }

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, {user.name}!</p>
      <hr />
      <h4>Your Credentials:</h4>
      <ul className="list-group">
        <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
        <li className="list-group-item"><strong>Phone Number:</strong> {user.phone_number}</li>
        <li className="list-group-item"><strong>NID:</strong> {user.nid}</li>
        <li className="list-group-item">
            <strong>Subscription Active:</strong> {user.subscription ? 'Yes' : 'No'}
        </li>
        {/* You can add more details from the user object if needed */}
         <li className="list-group-item"><strong>Joined:</strong> {new Date(user.date_joined).toLocaleDateString()}</li>
         <li className="list-group-item"><strong>Last Login:</strong> {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</li>
      </ul>

    </div>
  );
}

export default DashboardPage;
