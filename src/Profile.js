import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Profile() {
  const [name, setname] = useState('');
  const [bio, setbio] = useState('');
  const nav1=useNavigate();
  const username=localStorage.getItem("email");

    function personal_info(name,bio)
    {
   
        fetch('/personal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, name: name,bio:bio }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success===true)
            {
              nav1('/home');
            }
          
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
        
      
      

  
  return (
      <div className="Profile" >
        <img id="bg" src="bg.png" alt="Background" />
        <label >Profile Name*</label>
       <input
          type="text"
          value={name}
          placeholder='Name:'
          onChange={(e) => setname(e.target.value)}
        />
        <label >About Me*</label>

        <input
          type="text"
          value={bio}
          placeholder='Bio:'
          onChange={(e) => setbio(e.target.value)}
        />
        <button onClick={() => personal_info(name,bio)}>Save</button>
        <label>Set up profile name to help people find you easily. 
        </label>
        <label>Keep profile name different from username for security purpose.</label>
      </div>

    
  );
}


export default Profile;