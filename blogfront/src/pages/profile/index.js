import React, {useState, Component} from 'react';
import api from '../../services/api';
import axios from 'axios';
import { getToken } from "../../services/auth";

export default function Profile({ history }) {


  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [thumb, setThumb] = useState('');
  const [thumbname, setThumbName] = useState('');
  
  
  

  async function handleSubmit(event) {
    event.preventDefault();
    
    const evento = await api.put('/users', {username,email,oldPassword,password});

    const formData = new FormData();
    formData.append('file',thumb)

    try{
    await axios.put('http://localhost:4005/files',formData,
    {
      headers:{
      'authorization': 'Bearer '+getToken()},
      'Content-Type': 'multipart/form-data' ,
    })
  } catch(err){console.log('erro')}
    

    document.getElementById('eventoerro').append(evento.data.error);
    
    
  }

  const onChange = async e =>{
    setThumb(e.target.files[0])
    setThumbName(e.target.files[0].name)

    
  }

  
  

  return (
    <>
      

      <form id='form' className='form' onSubmit={handleSubmit}>
      <h1>
        EDITAR PERFIL
      </h1>
        <label htmlFor="title">Username</label>
        <input 
          id="title" 
          type="text" 
          
         value={username}
          onChange={event => setUsername(event.target.value)}
        />

<label htmlFor="title">Email</label>
        <input 
          id="title" 
          type="email" 
          
         value={email}
          onChange={event => setEmail(event.target.value)}
        />

<label htmlFor="password">Old Password</label>
        <input
          id="text" 
          type="password" 
          value={oldPassword}
          onChange={event => setOldPassword(event.target.value)}
        />


<label htmlFor="password">New Password</label>
        <input 
          id="tags" 
          type="password" 
         value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <input type='file' 
        id="thumb" 
               
        onChange={onChange}/>

        <button className="btn" type="submit">Update</button>

        <h2 className='erromsg' id='eventoerro'></h2>
      </form>

      
    </>
    
  )

}


