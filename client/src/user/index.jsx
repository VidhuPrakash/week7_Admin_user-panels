import React, { useState,useEffect } from 'react';
import LoginPage from './login/Login';
import axios from 'axios';
import './index.css'
import UserNav from './dashbord/nav/UserNav';
import BookedOrders from './dashbord/bkd_order/bookedOrders'
// import Order from './dashbord/order/Order';
import StripeCheckout from 'react-stripe-checkout';

function RegistrationPage() {
  const [isLog,setIsLog] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    password: '',
    confirmPassword: ''
  });
  const [showOrders, setShowOrders] = useState(false);
  const [showVehicles, setShowVehicles] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      console.log(formData.name);
      console.log(product.name);
      console.log(product.price*100)
      const response = await axios.post('/charge', { card:token.card,vehicleName: product.name,user:formData.name,amount: product.price * 100
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Payment did not go through.', error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let result = await axios.post('/signup',formData);
      if(result==="empty"){
        alert("Please enter valid information");
        return;
      }
      else{
        alert("Welcome");
        setIsLoggedIn(true);
      }
    }
    catch(error){
      alert(error);
    }
  };

  const onShowLoginPage=()=>{
    setIsLog(true);
  }
  return (
    <div className='index'>
    {isLoggedIn ? (
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
          <BookedOrders user={formData.name}></BookedOrders>
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
    ) : isLog ? (
      <LoginPage />
    ) : (
      <>
    <h1>Register user</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} /><br/>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br/>
      <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} /><br/>
      <input type="text" name="city" placeholder="City" onChange={handleChange} /><br/>
      <input type="text" name="state" placeholder="State" onChange={handleChange} /><br/>
      <input type="text" name="country" placeholder="Country" onChange={handleChange} /><br/>
      <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} /><br/>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br/>
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} /><br/>
      <button type="submit">Register</button><br/>
      <button type="button" onClick={onShowLoginPage}>Login</button>
    </form>
    </>
    )}
  </div>
);
}


export default RegistrationPage;
