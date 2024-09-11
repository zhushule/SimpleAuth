import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchCouponsByInterests, claimCoupon } from '../services/api';
import '../App.css';

function HomePage() {
  const history = useHistory();
  const [user, setUser] = useState({ email: '', firstName: '', lastName: '', interests: [] });
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState('');
  const [claimedCoupons, setClaimedCoupons] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log('Retrieved User Data:', userData);
    if (userData) {
      setUser({
        email: userData.email,  
        firstName: userData.firstName,
        lastName: userData.lastName,
        interests: userData.interests || []
      });

      const storedClaimedCoupons = JSON.parse(localStorage.getItem(`claimedCoupons_${userData.email}`)) || [];
      setClaimedCoupons(storedClaimedCoupons);
    } else {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (user.interests.length > 0) {
        try {
          const interestQuery = user.interests.join(',');
          const response = await fetchCouponsByInterests(interestQuery); 
          const allCoupons = response.data;
          const availableCoupons = allCoupons.filter(coupon => 
            !claimedCoupons.some(claimed => claimed.id === coupon.id)
          );

          setCoupons(availableCoupons);
        } catch (err) {
          console.error('Error fetching coupons:', err);
          setError('Error fetching coupons. Please try again.');
        }
      }
    };

    fetchCoupons();
  }, [user.interests, claimedCoupons]);

  const handleClaimCoupon = async (couponId) => {
    if (!user.email) {
      console.error('User email is not available.');
      setError('Email is missing. Please log in again.');
      return;
    }

    try {
      const response = await claimCoupon(user.email, couponId);
      alert('Coupon claimed successfully!');

      const claimedCoupon = coupons.find(coupon => coupon.id === couponId);
      const updatedClaimedCoupons = [...claimedCoupons, claimedCoupon];
      setClaimedCoupons(updatedClaimedCoupons);
      localStorage.setItem(`claimedCoupons_${user.email}`, JSON.stringify(updatedClaimedCoupons));
      setCoupons(coupons.filter(coupon => coupon.id !== couponId));
    } catch (err) {
      console.error('Error claiming coupon:', err);
      setError('Error claiming coupon. Please try again.');
    }
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

        {/* Display Claimed Coupons */}
        <h3>Your Claimed Coupons:</h3>
        {claimedCoupons.length > 0 ? (
          <div className="claimed-coupons-list">
            {claimedCoupons.map((coupon, index) => (
              <div key={index} className="claimed-coupon-ticket">
                <h4>{coupon.title}</h4>
                <p>{coupon.description}</p>
                <p><strong>Valid Until:</strong> {coupon.validUntil}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No claimed coupons yet.</p>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default HomePage;
