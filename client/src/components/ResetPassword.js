import React, { useState } from 'react';
import { resetPassword } from '../services/api';
import '../App.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(''); // State for the 6-digit code
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await resetPassword(email, code, password); // Use the 6-digit code
      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Reset Password</h2>
        {message && <p className={message.includes('error') ? 'error-message' : 'success-message'}>{message}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>
    </div>
  );
}

export default ResetPassword;
