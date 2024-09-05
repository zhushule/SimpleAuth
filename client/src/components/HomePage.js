import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchCouponsByInterests } from '../services/api';  // Import the new function
import '../App.css';

function HomePage() {
  const history = useHistory();
  const [user, setUser] = useState({ firstName: '', lastName: '', interests: [] });
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState('');
  const [claimedCoupons, setClaimedCoupons] = useState([]);  // State to track claimed coupons

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log('Retrieved User Data:', userData);
    if (userData) {
      setUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        interests: userData.interests || []
      });
    } else {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (user.interests.length > 0) {
        try {
          const interestQuery = user.interests.join(',');
          const response = await fetchCouponsByInterests(interestQuery);  // Use the function from api.js
          setCoupons(response.data);
        } catch (err) {
          console.error('Error fetching coupons:', err);
          setError('Error fetching coupons. Please try again.');
        }
      }
    };

    fetchCoupons();
  }, [user.interests]);

  // Function to handle claiming a coupon
  const handleClaimCoupon = (couponId) => {
    // Example: Mark the coupon as claimed and save it to local storage
    const claimedCoupon = coupons.find(coupon => coupon.id === couponId);
    setClaimedCoupons([...claimedCoupons, claimedCoupon]);  // Update the claimed coupons state

    // Save claimed coupons to local storage
    localStorage.setItem('claimedCoupons', JSON.stringify([...claimedCoupons, claimedCoupon]));

    // Optional: Remove the claimed coupon from the list if needed
    setCoupons(coupons.filter(coupon => coupon.id !== couponId));
  };

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

        <h3>Your Available Coupons:</h3>
        {error && <p className="error-message">{error}</p>}
        {coupons.length > 0 ? (
          <div className="coupons-list">
            {coupons.map(coupon => (
              <div key={coupon.id} className="coupon-item">
                <h4>{coupon.title}</h4>
                <p>{coupon.description}</p>
                <p><strong>Valid Until:</strong> {coupon.validUntil}</p>
                {/* Add Claim Button */}
                <button onClick={() => handleClaimCoupon(coupon.id)}>Claim</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No coupons available for your selected interests.</p>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default HomePage;
