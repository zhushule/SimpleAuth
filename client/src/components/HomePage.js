import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

function HomePage() {
  const history = useHistory();
  const [user, setUser] = useState({ firstName: '', lastName: '', interests: [] });

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log('Retrieved User Data:', userData);  // Debug line to check retrieved data
    if (userData) {
      setUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        interests: userData.interests || []  // Retrieve interests if available
      });
    } else {
      // If no user data, redirect to login page
      history.push('/login');
    }
  }, [history]);
  

  const handleLogout = () => {
    // Clear any session data if necessary
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Welcome to the Home Page</h2>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>

        {/* Display the user's interests */}
        <h3>Your Interests:</h3>
        {user.interests.length > 0 ? (
          <ul>
            {user.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        ) : (
          <p>No interests selected.</p>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default HomePage;
