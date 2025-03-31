import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [lt, setlt] = useState('Sign Up');
  const [bt, setbt] = useState('Log In');
  const [disp,setdisp]=useState("none");
  const [text,settext]=useState("");
  const [visibility,setvisibility]=useState("block");
  const [msg,cmsg]=useState("New to this app?");


        async function post(email, password,bt) {
        try {
          const response = await axios.post('/login', {
            email: email,
            password: password,
            bt: bt
          });
          
          console.log(response.data);
          if(bt=="Log In")
            if (response.data.length === 0) {
              setdisp("block");
              settext("Invalid Credentials!");
            }
            else if(response.data[0].email===email && response.data[0].password===password){
              setdisp("none");
              settext("");
            }
          else if(bt=="Sign Up")
            console.log(response.success);
            console.log(response.data.success);
            if (response.data.success===false) {
              setdisp("block");
              settext(`${email} already exists!`);
            }
            else if(response.data.success===true){
              setdisp("none");
              settext("");
            }
        } 
        
        catch (error) {
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
        <label >Username:</label>
       <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <label >Password:</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <label style={{display:disp}}>{text}</label>
        <button style={{display:visibility}}>Forgot Password?</button>
        <button onClick={() => post(email,password,bt)}>{bt}</button> 
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