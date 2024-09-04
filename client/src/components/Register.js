import React, { useState } from 'react';
import { register } from '../services/api';
import { Link } from 'react-router-dom';
import '../App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); // Added
  const [lastName, setLastName] = useState(''); // Added
  const [birthday, setBirthday] = useState(''); // Added
  const [gender, setGender] = useState(''); // Added
  const [interests, setInterests] = useState([]); // State to manage selected interests
  const [message, setMessage] = useState('');

  // List of available interests
  const availableInterests = ["Music", "Sports", "Technology", "Art", "Travel"];

  const handleRegister = async () => {
    try {
      const response = await register(email, password, firstName, lastName, birthday, gender, interests);
      console.log('Registration Response:', response.data);  // Debug line to check the response
      setMessage(response.data.message);
    } catch (error) {
      console.error('Registration Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  // Handle checkbox changes
  const handleInterestChange = (interest) => {
    setInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        // Remove the interest if it's already selected
        return prevInterests.filter((i) => i !== interest);
      } else if (prevInterests.length < 3) { // Limit to 3 selections
        // Add the interest if it's not selected and limit is not reached
        return [...prevInterests, interest];
      } else {
        return prevInterests; // Do nothing if the limit is reached
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

        <h3>Select Your Interests (Choose up to 3)</h3>
        {availableInterests.map((interest) => (
          <label key={interest} style={{ display: 'block', marginBottom: '8px' }}>
            <input
              type="checkbox"
              value={interest}
              checked={interests.includes(interest)}
              onChange={() => handleInterestChange(interest)}
            />
            {interest}
          </label>
        ))}

        <button onClick={handleRegister}>Register</button>
        <div className="register-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
