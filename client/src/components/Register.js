import React, { useState } from 'react';
import { register } from '../services/api';
import { Link } from 'react-router-dom';
import '../App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState([]); 
  const [message, setMessage] = useState('');

  // List of available interests
  const availableInterests = ["Music", "Sports", "Technology", "Art", "Travel"];

  const handleRegister = async () => {
    try {
      const response = await register(email, password, firstName, lastName, birthday, gender, interests);
      console.log('Registration Response:', response.data);
      setMessage(response.data.message);

      if (response.data.success) {
        localStorage.removeItem(`claimedCoupons_${email}`);
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Registration Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleInterestChange = (interest) => {
    setInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter((i) => i !== interest);
      } else {
        return [...prevInterests, interest];
      }
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Register</h2>
        {message && <p className="success-message">{message}</p>}
        
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <h3>Select Your Interests (Choose from 0 to {availableInterests.length})</h3>
        {/* Styled checkboxes for Interests */}
        <div className="checkbox-container">
          {availableInterests.map((interest) => (
            <label key={interest}>
              <input
                type="checkbox"
                value={interest}
                checked={interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
              />
              {interest}
            </label>
          ))}
        </div>

        <button onClick={handleRegister}>Register</button>
        <div className="register-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
