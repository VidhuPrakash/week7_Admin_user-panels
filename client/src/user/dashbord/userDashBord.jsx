import React from 'react';
import { useLocation } from 'react-router-dom';
import UserNav from './nav/UserNav';
import Order from './order/Order';

// Define your UserDashboard component
function UserDashboard() {
  const location = useLocation();
  const { name } = location.state || {}; // Extract the name prop from location state

  console.log(name);

  return (
    <div>
      <UserNav />
      <Order name={name} />
    </div>
  );
}

export default UserDashboard;
