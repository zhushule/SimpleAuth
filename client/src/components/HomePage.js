import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

function HomePage() {
  const history = useHistory();
  const [user, setUser] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({
        firstName: userData.firstName,
        lastName: userData.lastName
      });
    } else {
      history.push('/login');
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Welcome to the Home Page</h2>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default HomePage;
