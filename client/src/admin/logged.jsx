import React from 'react';
import { useState } from 'react';
import AddVehicle from './logComponent/addVehicle';
import ShowVehicle from './logComponent/ShowVehicle';
function AdminLog() {
  const [refreshKey, setRefreshKey] = useState(0); // Create a key to force
  const onProductAdded = () => {
    // Increment the key to force the re-render of ShowVehicle
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <div className='logged'>
      <br />
      <AddVehicle onProductAdded={onProductAdded} />
      <br />
      <ShowVehicle key={refreshKey} /> {/* Pass the key as a prop */}
    </div>
  );
}

export default AdminLog;