import React, { useState } from 'react';
import api from '../../services/api';



export default function Login({ history }) {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

    

  async function handleSubmit(event) {
    event.preventDefault();

    const evento = await api.put('/users', {username,email,oldPassword,password});
    

    document.getElementById('eventoerro').append(evento.data.error);
    
    //const { _id } = response.data;

    //localStorage.setItem('user', _id);

   // history.push('/dashboard');
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
          type="text" 
          
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

        <input type='file'/>

        <button className="btn" type="submit">Update</button>

        <h2 className='erromsg' id='eventoerro'></h2>
      </form>

      
    </>
    
  )

  
}