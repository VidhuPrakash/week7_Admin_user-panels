import React from 'react'

import { useNavigate } from 'react-router-dom';
import './nav.css';

function AdminNav() {
  const navigate = useNavigate();

  const toShoworders = () => {
    navigate('/admin/orders');
  };
  return (
    <div className='f'>
        <h1 >!VEHICLE-Online</h1>
        <h2>ADMIN PANEL</h2>
        <button onClick={toShoworders}>Show Orders</button>
    </div>
  )
}

export default AdminNav