import React, { useEffect, useState, useMemo, Component } from 'react';

import api from '../../services/api';
import './style.css';


export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [user, setUsers] = useState([]);
 

  useEffect(() => {
    async function loadPosts() {
      
      const response = await api.get('/posts', {
       
        
      });

     
      

      setPosts(response.data.post);
    }

    loadPosts();
  }, []);




  return (

    <>



  
   
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