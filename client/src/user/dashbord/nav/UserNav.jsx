import React, { useState } from 'react';
import './usernav.css';

function UserNav({ onShowOrders, onShowVehicles }) {
  const [isOrderVisible, setIsOrderVisible] = useState(false);

  const handleClick = () => {
    if (isOrderVisible) {
      onShowVehicles();
    } else {
      onShowOrders();
    }
    setIsOrderVisible(!isOrderVisible);
  };

  return (
    <div className='Nav-Bar'>
      <h1 className='Nav-head'>!Vehicle-Online</h1>
      <ul className='Nav-cont'>
        <li>Home</li>
        <li>Contact</li>
        <li>Feedback</li>
        <li>About us</li>
      </ul>
      <button onClick={handleClick}>{isOrderVisible ? 'Book new vehicle' : 'Show Orders'}</button>
    </div>
  );
}

export default UserNav;
