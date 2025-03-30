import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [lt, setlt] = useState('Sign Up');
  const [bt, setbt] = useState('Log In');

  const [visibility,setvisibility]=useState("block");
  const [msg,cmsg]=useState("New to this app?");
  //function handleSubmit()  {


  function verifyEmail (email,password)  {
      const url = `https://emailvalidation.abstractapi.com/v1/?api_key=e235e86385f44282807f8b5c1a7e05a0&email=${email}`;
      console.log(email)
      fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the full response for debugging
  
        if (data.is_valid_format.value && data.deliverability === 'DELIVERABLE' && password.length>0) {
          console.log('Email exists and is deliverable');
          post(email,password);
        } else {
          console.log('Email does not exist or is not deliverable');
          alert("Enter a valid Email Address!");

        }
      })
      .catch(error => console.error(error));

      } ;
  

      async function post(email, password) {
        try {
          const response = await axios.post('/server/login', {
            email: email,
            password: password,
          });
      
          console.log('Data:', response.data); // Log the parsed JSON data
        } catch (error) {
          console.error('Error:', error.response ? error.response.data : error.message); // Log any errors
        }
      }
      
  useEffect(() => {
    let s=document.getElementById("s");
    s.addEventListener("click",()=>{

    })})
  return (
    <div className="App" >
        <img id="bg" src="bg.png" alt="Background" />
        <label >Email:</label>
       <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <label >Password:</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        
        <button style={{display:visibility}}>Forgot Password?</button>
        <button onClick={() => verifyEmail(email,password)}>{bt}</button> 
        <label  id="t">{msg}<label
          id="s"
          onClick={() => {
            if (lt==="Sign Up"){
              setlt("Log In");
              setbt("Sign Up");
              setvisibility("none");
              cmsg("Signed in already?");
            }
            else{
              setlt("Sign Up");
              setbt("Log In");
              setvisibility("block");
              cmsg("New to this app?");
            }
          }}
           
        >
          {lt}
        </label></label>
      
    </div>
  );
}

export default App;