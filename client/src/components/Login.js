import React, { useState } from 'react';
import { login } from '../services/api';
import { useHistory, Link } from 'react-router-dom';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log(response.data); 
      if (response.data.success) {
        if (response.data.isAdmin) {
          history.push('/admin');
        } else {
          history.push('/home');
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
        
        <label style={{ display: 'flex', alignItems: 'center' }}>
          Remember Me
          <input type="checkbox" style={{ marginLeft: '5px' }} />
        </label>
        
        <div style={{ marginTop: '10px' }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
      
      <div className="register-link" style={{ marginTop: '20px', textAlign: 'center' }}>
        Not a Member? <Link to="/register">Create an Account</Link>
      </div>
    </div>
  );
  
}

export default Login;
