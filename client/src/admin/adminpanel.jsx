import React, { useState } from 'react'
import axios from 'axios';
import './admin.css'
import AdminLog from './logged';
import AdminNav from './logComponent/adminNav';
function AdminPanel() {

    const [name,setName] = useState('')
    const [password,setPassword] = useState('');
    const [isadmin,setIsAdmin] = useState(null);


    const validateAdmin = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('/admin/login', { name, password });
          console.log(response.data);
          if (response.data === 'Login successful') {
            setIsAdmin(true);
            alert("Login Succesful");}
            else{
            alert("Access denied");
          }
        } catch (error) {
          console.error(error);
          
          alert(error);
        }
      };
  return (
    <div className='log'>
        
        {isadmin ? <><AdminNav/>,<AdminLog /></> :
        <>
        <input className='in-user' type='text' placeholder='UserName' onChange={(e) => setName(e.target.value)} value={name}></input>
        <br/>
        <input className='in-pass' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
        <br/>
        <button className='in-btn' onClick={validateAdmin}>LOGIN</button>
        </>}
    </div>
  )
}


export default AdminPanel;