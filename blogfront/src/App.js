import React from 'react';
import './App.css';
import Routes from './route'
import api from './services/api'

window.onload = async function() { 
  const response = await api.get("/sessions");
   const avatar = response.data.avatar.path
   const name = response.data.userid.username
   
   document.getElementById("myImg").src = avatar;
   document.getElementById('name').append(name);
   
   
 
 }

 
 


function App() {

  return (
  
    

    <div className="content">

<div className = 'perfil'>

<ul>
   <li><a href='./profile'><img id="myImg"></img><span className ='avatarNome' id="name"></span></a></li>
   <li > <a href='./'>Home</a> </li>
   <li> <a href='./dashboard'>Postar</a> </li>
   <li> Sobre </li>

</ul>

 
</div>

    <Routes />  


      </div>
    
  );
}



export default App;
