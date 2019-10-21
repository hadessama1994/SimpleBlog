import React, { useState } from 'react';
import api from '../../services/api';
import './style.css';


export default function Login({ history }) {
  const [title, setTitle] = useState('');
  const [posttext, setText] = useState('');
  const [tags, setTags] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    await api.post('/posts', { title,posttext,tags});
    document.getElementById("form").reset()
    
    //const { _id } = response.data;

    //localStorage.setItem('user', _id);

   // history.push('/dashboard');
  }

  return (
    <>
      

      <form id='form' className='form' onSubmit={handleSubmit}>
      <h1>
        CRIAR UMA POSTAGEM
      </h1>
        <label htmlFor="title">Titulo *</label>
        <input 
          id="title" 
          type="text" 
          
         value={title}
          onChange={event => setTitle(event.target.value)}
        />

<label htmlFor="texto">Texto *</label>
        <textarea rows="10" cols="40" maxLength="9999"
          id="text" 
          type="text" 
          value={posttext}
          onChange={event => setText(event.target.value)}
        />


<label htmlFor="tags">Tags (separe por virgulas)</label>
        <input 
          id="tags" 
          type="text" 
         value={tags}
          onChange={event => setTags(event.target.value)}
        />

        

        <button className="btn" type="submit">Postar</button>
      </form>
    </>
  )
}