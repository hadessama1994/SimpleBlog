import React, { useState } from 'react';
import api from '../../services/api';



export default function Login({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  

    

  async function handleSubmit(event) {
    event.preventDefault();
    
    try{
    await api.post('/users', {username,email,password});
    history.push('/');
    }
    
    catch(e){
      document.getElementById('eventoerro').append("Preencha todos os dados");
  }
    
    
    

    
  }

  

  return (
    <>
      

      <form id='form' className='form' onSubmit={handleSubmit}>
      <h1>
        CADASTRAR
      </h1>
        <label htmlFor="title">Username*</label>
        <input 
          id="title" 
          type="text" 
          
         value={username}
          onChange={event => setUsername(event.target.value)}
        />

<label htmlFor="title">Email*</label>
        <input 
          id="title" 
          type="text" 
          
         value={email}
          onChange={event => setEmail(event.target.value)}
        />


<label htmlFor="password">Password*</label>
        <input 
          id="tags" 
          type="password" 
         value={password}
          onChange={event => setPassword(event.target.value)}
        />

        

        <button className="btn" type="submit">criar</button>

        <h2 className='erromsg' id='eventoerro'></h2>
      </form>

      
    </>
    
  )

  
}