import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

function HomePage() {
  const history = useHistory();

  const handleLogout = () => {
    // Clear any session data if necessary
    history.push('/login');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Welcome to the Home Page</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default HomePage;
