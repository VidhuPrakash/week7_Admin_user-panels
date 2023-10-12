import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './showOrd.css'
function ShowOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('orders') // replace with your API endpoint
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  const toShowAdmin = () => {
    navigate(-1);
  }

  return (
    <div className='showOrder'>
      <button onClick={toShowAdmin}>Back to Admin</button>
      <table className='ord-table'>
        <thead>
          <tr>
            <th>User</th>
            <th>Vehicle Name</th>
            <th>Amount</th>
            <th>Payment Type</th>
            <th>City</th>
            <th>Country</th>
            <th>Address Line 1</th>
          </tr>
        </thead>
        <tbody className='ords'>
          {orders.map((order, index) => (
            <tr key={index}>
              <td><strong>{order.user}</strong></td>
              <td>{order.vehicleName}</td>
              <td>{order.amount}</td>
              <td>{order.card.object}</td>
              <td>{order.card.address_city}</td>
              <td>{order.card.address_country}</td>
              <td>{order.card.address_line1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowOrder;
