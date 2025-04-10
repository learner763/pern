import React, { use, useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function Home()
{
    const [info, setinfo] = useState([]);
    let username = localStorage.getItem("email");
    const nav2=useNavigate();
    const [up_user,setup_user]=useState('');
    const [up_name,setup_name]=useState('');
    const [up_bio,setup_bio]=useState('');
    const [part1,setpart1]=useState('flex');
    const [part2,setpart2]=useState('none');
    const [part3,setpart3]=useState('none');
    const [pass,setpass]=useState('')
    const [bgr,setbg]=useState('white')
    let w=-1;
    function update_info(up_user,up_name,up_bio)
    {
        fetch('/save_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ previous: username, username: up_user, name: up_name,bio:up_bio }),
        })
        .then(response => response.json())
        .then(data =>
        {
            if(data.success)
            {
                localStorage.setItem("email",up_user);
            }
        });
    }
    function update_settings(pass,bg)
    {
        fetch('/save_settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: pass, bg: bg }),
        })
        .then(response => response.json())
        
    }
    useEffect(() => {
        fetch("/accounts")
        .then(response => response.json())
        .then(data => 
            {
                let accounts=[] 
                for(let i=0;i<data.length;i++)
                {
                    if(data[i].email===username)
                    {
                        setup_user(data[i].email);
                        setup_name(data[i].name);
                        setup_bio(data[i].bio);
                        setpass(data[i].password);
                        setbg(data[i].bg);
                        console.log(data[i].bg)
                        console.log(bg)
                        
                    }
                }
                for(let i=0;i<data.length;i++)
                {
                    accounts.push(data[i].name);
                    accounts.push(data[i].bio);
                    
                    
                }
                setinfo(accounts);

            }
        );
        let icons=document.querySelectorAll(".home11 label");
        for(let i=0;i<icons.length;i++)
        {
            icons[i].addEventListener('click',()=>{
                for(let j=0;j<icons.length;j++)
                {
                    icons[j].style.backgroundColor='lightgreen';
                    icons[j].style.color='darkgreen';
                }   
                icons[i].style.backgroundColor='darkgreen';
                icons[i].style.color='white';
                if(i==0){setpart1('flex');setpart2('none');setpart3('none');}
                if(i==1){setpart1('none');setpart2('flex');setpart3('none');}
                if(i==2){setpart1('none');setpart2('none');setpart3('flex');}
            });
        }
        
    }, []);
    return(
        <div className='home'>
            <div className='top'>
                <label>Whatsupp</label>
                <label><i class='fas fa-user'></i>{up_name}</label>
            </div>
            <div className='home1' style={{backgroundColor:bgr}} onChange={(e)=>setbg(e.target.value)}>
                <div className='home11'>
                    <label><i class='fas fa-comment-dots'></i>Chats</label>
                    <label><i class='fas fa-user'></i>Profile</label>
                    <label><i class='fas fa-cog'></i>Settings</label>
                    <label onClick={()=>nav2('/')} ><i class='fas fa-user-plus'></i>Add Account</label>

                </div>
                <div className='home12'>

                    <div className='part1' style={{display:part1}}>
                        ahah
                    </div>

                    <div className='part2' style={{display:part2}} >
                        <i style={{alignSelf:'center'}} class='fas fa-user'></i>
                        <label>Username</label>
                        <input onChange={(e)=>setup_user(e.target.value)} value={up_user} style={{alignSelf:'end'}}></input>
                        <label>Name</label>
                        <input onChange={(e)=>setup_name(e.target.value)} value={up_name} style={{alignSelf:'end'}}></input>
                        <label>About</label>
                        <input onChange={(e)=>setup_bio(e.target.value)} value={up_bio} style={{alignSelf:'end'}}></input>
                        <button onClick={()=>update_info(up_user,up_name,up_bio)} id="save">Save</button>
                    </div>
                    
                    <div className='part3' style={{display:part3}} >
                        <i style={{alignSelf:'center'}} class='fas fa-user'></i>
                        <label>Change Password</label>
                        <input onChange={(e)=>setpass(e.target.value)} value={pass} style={{alignSelf:'end'}}></input>
                        <label>Background Theme</label>
                        <select value={bg} style={{ alignSelf:'end'}} onChange={(e)=>setbg(e.target.value)} >
                            <option style={{color:"white"}} value="white">White</option>
                            <option style={{color:"black"}} value="black">Black</option>
                            <option style={{color:"red"}} value="red">Red</option>
                            <option style={{color:"yellowgreen"}} value="yellowgreen">YellowGreen</option>
                            <option style={{color:"blue"}} value="blue">Blue</option>
                            <option style={{color:"lime"}} value="lime">Lime</option>
                            <option style={{color:"goldenrod"}} value="goldenrod">Goldenrod</option>
                            <option style={{color:"purple"}} value="purple">Purple</option>
                            <option style={{color:"orange"}} value="orange">Orange</option>
                            <option style={{color:"pink"}} value="pink">Pink</option>

                        </select>
                        <button onClick={()=>update_settings(pass,bg)} id="save">Save</button>
                    </div>
                </div>
                
                <div className='home13' >
                    <span id="youmayknow" style={{fontWeight:'bold', display:'flex', justifySelf:'center', alignSelf:'center',color:'darkgreen'}}>People you may know!</span>
                    {info.reverse().map((a, index) => {
                        if (index < info.length / 2) {
                            w = w + 1; // Increment w before returning
                            return (
                                <div className='userinfo' key={index}> 
                                    <i className='fas fa-user'></i> 
                                    <span>{info[info.indexOf(a) + w]}</span> 
                                    <span style={{fontWeight:'normal'}}>{info[info.indexOf(a) + w + 1]}</span>
                                    <button><i className='fas fa-people-arrows'></i>Connect</button>
                                </div>
                            );
                        }
                        return null; // Return null if the condition is not met
                    })}
                </div>

            </div>
        </div>
    );
}
export default Home;
