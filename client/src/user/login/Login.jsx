import React, { useState,useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import UserNav from '../dashbord/nav/UserNav';
import BookedOrders from '../dashbord/bkd_order/bookedOrders';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [showOrders, setShowOrders] = useState(false);
  const [showVehicles, setShowVehicles] = useState(true);

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
      console.log(user);
      console.log(product.name);
      console.log(product.price*100)
      const response = await axios.post('/charge', { card:token.card,vehicleName: product.name,user:user,amount: product.price * 100
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Payment did not go through.', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/login', { user, pass });
  
      if (response.data === 'login') {
        console.log('Login successful');
        setIsLoggedIn(true);
        console.log(user);
      } else {
        console.log('Login failed');
        setError('Login failed');
      }
    } catch (err) {
      console.error('An error occurred while logging in:', err);
      setError('An error occurred while logging in.');
    }
  };
  

  return (
    isLoggedIn ? (
      <div>
        <UserNav
          onShowOrders={() => {
            setShowOrders(true);
            setShowVehicles(false);
          }}
          onShowVehicles={() => {
            setShowVehicles(true);
            setShowOrders(false);
          }}
        />
        {showOrders ? (
          <BookedOrders user={user}></BookedOrders>
        ) : showVehicles ? (
          <div>
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
            <td><img src={`http://localhost:1111/upload/${product.image}`} alt={product.name} /></td>
            <td>
            <StripeCheckout
        token={(token) => onToken(token, product)} // Pass the product object to onToken
        stripeKey="pk_test_51NywUVSHP47YPyINRW59EmRrA1f6VP9LVevKqIe0OvkPsBhqB34bfDPyQyhUCBqabzyBp5TTaZ6uhJSw5OSqhs3s00jZT1rz3K"
        amount={product.price * 100} // Amount in cents
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
          </div>
        ) : null}
      </div>
    ) : (
      <div>
        <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} name="username" placeholder="Enter your username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} name="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
    )
  );
}

export default Login;