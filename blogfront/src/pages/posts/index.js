import React, { useEffect, useState, useMemo, Component } from 'react';

import api from '../../services/api';
import './style.css';


export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [user, setUsers] = useState([]);
 

  useEffect(() => {
    async function loadPosts() {
      
      const response = await api.get('/posts', {
        query: {}
        
      });

      console.log(response)
      

      setPosts(response.data.post);
    }

    loadPosts();
  }, []);




  return (

    <>



    <div className="container">
    <div className="brand">
<div className="logo">
  <svg width="200px" height="200px" >
        <path stroke="#b900b0#" strokeWidth="0" fill="#b900b0" d="M140.773,59.227C137.316,55.771,130.055,50,100,50
        s-37.317,5.771-40.774,9.227C55.77,62.684,49.999,69.104,50,100c-0.001,30.896,5.77,37.316,9.227,40.773
        C62.683,144.229,69.103,150,100,150c30.895,0,37.317-5.771,40.772-9.227C144.229,137.316,150,130.896,150,100
        S144.229,62.683,140.773,59.227z"/>
  
        <path stroke="#b900b0" strokeWidth="0" fill="#b900b0" d="M140.773,59.227C137.316,55.771,130.055,50,100,50
        s-37.317,5.771-40.774,9.227C55.77,62.684,49.999,69.104,50,100c-0.001,30.896,5.77,37.316,9.227,40.773
        C62.683,144.229,69.103,150,100,150c30.895,0,37.317-5.771,40.772-9.227C144.229,137.316,150,130.896,150,100
        S144.229,62.683,140.773,59.227z"/>
  
        <path stroke="#ff004e" strokeWidth="0" fill="#ff004e" d="M140.773,59.227C137.316,55.771,130.055,50,100,50
        s-37.317,5.771-40.774,9.227C55.77,62.684,49.999,69.104,50,100c-0.001,30.896,5.77,37.316,9.227,40.773
        C62.683,144.229,69.103,150,100,150c30.895,0,37.317-5.771,40.772-9.227C144.229,137.316,150,130.896,150,100
        S144.229,62.683,140.773,59.227z"/>
  </svg>
</div>
</div></div>
   
    <div id= "postagens" className='postagens'> 
      <ul id = 'abc' className="SG" >
      {posts.map(post => (
          <li className="sgLi post" key={post._id}>
            <h3 className="title"> {post.title} </h3>
            
            <div className = 'avatar'>
            <img className='image' src={post.avatarid.path}></img>            
            <p className='ribbon' id = 'author'><span className="text"> {post.userid.username}  </span></p>   </div>    

            <p className='texto'> {post.posttext} </p>
            
            
          
           
            <p className='data'>Tags:<a> {post.tags}</a> <br></br>{post.created_at}</p>
            
           </li>
        ))}
      </ul>
      </div>

      
    </>
  )
}