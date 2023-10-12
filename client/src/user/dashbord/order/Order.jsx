import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import './order.css';

function Order( {name}) {
  console.log(name);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/vehicle');
        setProducts(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchData();
  }, []);

  const onToken = async (token,product) => {
    try {
      console.log(token.card);
      const response = await axios.post('/charge', { card:token.card,vehicleName: product.name,  user: name
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Payment did not go through.', error);
    }
  };

  return (
    <table className='ProductTable'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Order</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.manufacturer}</td>
            <td>{product.model}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
            <td><img src={`http://localhost:1111/userdashboard/upload/${product.image}`} alt={product.name} /></td>
            <td>
              <StripeCheckout
                token={onToken}
                stripeKey="pk_test_51NywUVSHP47YPyINRW59EmRrA1f6VP9LVevKqIe0OvkPsBhqB34bfDPyQyhUCBqabzyBp5TTaZ6uhJSw5OSqhs3s00jZT1rz3K"
                amount={product.price * 100} // amount in cents
                name={product.name}
                billingAddress
                shippingAddress
              >
                <button>Place Order</button>
              </StripeCheckout>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Order;