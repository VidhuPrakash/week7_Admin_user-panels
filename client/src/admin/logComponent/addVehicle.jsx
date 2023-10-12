import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addvehi.css';

function AddProduct({ onProductAdded }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    manufacturer: '',
    model: '',
    price: '',
    quantity: '',
    image: '',
  });

  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await axios.get('/admin/manufacturers');
        setManufacturers(response.data);
      } catch (error) {
        setError('Error fetching manufacturers.'); // Handle error
      }
    };

    const fetchModels = async () => {
      try {
        const response = await axios.get('/admin/models');
        setModels(response.data);
      } catch (error) {
        setError('Error fetching models.'); // Handle error
      }
    };

    fetchManufacturers();
    fetchModels();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      if (key !== 'image') {
        formData.append(key, product[key]);
      }
    });

    formData.append('image', product.image);

    try {
      const response = await axios.post('/admin/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Vehicle added successfully');
      onProductAdded();
    } catch (error) {
      setError('Error adding vehicle.'); // Handle error
    }
  };
  return (
    <form onSubmit={handleSubmit} className='formm'>
      <input placeholder='Name' type="text" name="name" onChange={handleChange} value={product.name} />
      <select placeholder='manufacturer' name="manufacturer" onChange={handleChange} value={product.manufacturer}>
      <option value="">SELECT VALUE</option>
  {manufacturers.map((manufacturer) => (
    <option key={manufacturer._id} value={manufacturer.name}>
      {manufacturer.name}
    </option>
  ))}
</select>
<select placeholder='model' name="model" onChange={handleChange} value={product.model}>
<option value="">SELECT VALUE</option>
  {models.map((model) => (
    <option key={model._id} value={model.name}>
      {model.name}
    </option>
  ))}
</select>
      <input placeholder='Price' type="number" name="price" onChange={handleChange} value={product.price} />
      <input placeholder='description' type='text' name="description" onChange={handleChange} value={product.description}></input>
      <input placeholder='Quantity' type="number" name='quantity' onChange={handleChange} value={product.quantity}></input>
      
      <input type="file" name="image" onChange={handleChange} />
     
      <button type="submit">Add Product</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default AddProduct;
