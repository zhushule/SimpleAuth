import React, { useState } from 'react';
import { login, getUserDetails } from '../services/api';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log('Login Response data:', response.data); 

      if (response.data.success) {
        const userDetailsResponse = await getUserDetails(email);
        console.log('User Details Response data:', userDetailsResponse.data); 
        
        const { firstName, lastName, interests } = userDetailsResponse.data; 
        
        if (firstName && lastName) {
          // Store the user data including interests in local storage
          localStorage.setItem('user', JSON.stringify({ 
            firstName, 
            lastName,
            interests 
          }));

          if (response.data.isAdmin) {
            history.push('/admin');
          } else {
            history.push('/home');
          }
        } else {
          console.error('User data is missing firstName or lastName.');
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Type Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Type Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Sign In</button>
        <div className="options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="register-link">
          Not a Member? <Link to="/register">Create an Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
