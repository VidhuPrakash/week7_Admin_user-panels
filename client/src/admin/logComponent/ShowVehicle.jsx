import React, { useState, useEffect } from "react";
import axios from "axios";
import './showVehicle.css'
function ShowVehicle() {
  const [vehicle, setVehicle] = useState(null);
  const [editedVehicle, setEditedVehicle] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/products");
        setVehicle(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event, id) => {
    setEditedVehicle({
      ...editedVehicle,
      [id]: {
        ...editedVehicle[id],
        [event.target.name]: event.target.value,
      },
    });
  };

  const updateValue = (id, updateVehicle) => {
    if (
      (updateVehicle.name !== undefined && updateVehicle.name === '') ||
      (updateVehicle.manufacturer !== undefined && updateVehicle.manufacturer === '') ||
      (updateVehicle.model !== undefined && updateVehicle.model === '') ||
      (updateVehicle.price !== undefined && updateVehicle.price === '') ||
      (updateVehicle.description !== undefined && updateVehicle.description === '')
    ) {
      alert("Please fill all fields");
      return;
    }

    axios
      .put(`/admin/products/${id}`, updateVehicle)
      .then((response) => {
        console.log("Updated");
        // Update the vehicle state with the updated vehicle
        setVehicle(vehicle.map((v) => (v._id === id ? response.data : v)));
        // Clear the editedVehicle state for this id
        setEditedVehicle({ ...editedVehicle, [id]: undefined });
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };

  const deleteValue = (id) => {
    axios
      .delete(`/admin/products/${id}`)
      .then((response) => {
        setVehicle(vehicle.filter((v) => v._id !== id));
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div>
      <h1 className="head">Vehicle Data</h1>
      <tr className="Thead">
        <td>Name</td>
        <td>Image</td>
        <td>Manufacturer</td>
        <td>Model</td>
        <td>Price</td>
        <td>Description</td>
        <td>Quantity</td>
      </tr>
      {vehicle ? (
        vehicle.map((v) => (
          <div className="Vehicle-Box" key={v._id}>
            <td>
            <h1>{v.name}</h1>
            </td>
            <td>
            <img src={`http://localhost:1111/admin/upload/${v.image}`} />
            </td>
            <td>
              <input
                name="manufacturer"
                value={
                  editedVehicle[v._id]?.manufacturer !== undefined
                    ? editedVehicle[v._id]?.manufacturer
                    : v.manufacturer
                }
                onChange={(event) => handleInputChange(event, v._id)}
              />
            </td>
            <td>
              <input
                name="model"
                value={editedVehicle[v._id]?.model || v.model}
                onChange={(event) => handleInputChange(event, v._id)}
              />
            </td>
            <td>
              <input
                name="price"
                value={editedVehicle[v._id]?.price || v.price}
                onChange={(event) => handleInputChange(event, v._id)}
              />
            </td>
            
            <td>
              <input
                name="description" // Corrected here
                value={editedVehicle[v._id]?.description || v.description}
                onChange={(event) => handleInputChange(event, v._id)}
              />
            </td>
            <td>
              <input
                name="quantity" // Corrected here
                value={editedVehicle[v._id]?.quantity || v.quantity}
                onChange={(event) => handleInputChange(event, v._id)}
              />
            </td>
            <tr>
              <button
                onClick={() => updateValue(v._id, editedVehicle[v._id] || v)}
              >
                Update
              </button>

              <button onClick={() => deleteValue(v._id)}>Delete</button>
            </tr>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ShowVehicle;
