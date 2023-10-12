import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bkd.css'
function Orders({user}) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders/${user}`); // replace with your API endpoint
        setOrders(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='Bkd-table'>
  <table>
    <thead>
      <tr>
        <th>Card ID</th>
        <th>Payment Type</th>
        <th>City</th>
        <th>Country</th>
        <th>Address Line 1</th>
        <th>Vehicle Name</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order, index) => (
        <tr key={index}>
          <td>{order.card.id}</td>
          <td>{order.card.object}</td>
          <td>{order.card.address_city}</td>
          <td>{order.card.address_country}</td>
          <td>{order.card.address_line1}</td>
          <td>{order.vehicleName}</td>
          <td>{order.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
  
}

export default Orders;
