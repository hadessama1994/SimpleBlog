import React from 'react';
import './App.css';
import Routes from './route'
import api from './services/api'
import { logout } from "../src/services/auth";

window.onload = async function myFunction() { 
  
  try{ 
  const response = await api.get("/sessions");
  const avatar = response.data.avatar.path
   const name = response.data.userid.username
   
   document.getElementById("myImg").src = avatar;
   document.getElementById('name').append(name);
   document.getElementById("linkPerilCadastro").href="./profile";
  document.getElementById("linkPost").href="./dashboard";
  document.getElementById('logout').append('Logout')
}

catch(e){ //se nao tiver ninguem logado ainda
  console.log('deu ruim')
  document.getElementById("myImg").src = 'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png.png';
  document.getElementById('name').append("Logar");
  document.getElementById("linkPerilCadastro").href="./login";
  document.getElementById("linkPost").href="./login";
  //let node = document.createElement('LI');
  //let textnode = document.createTextNode('Logout')
  //node.appendChild(textnode)
  //document.getElementById('logout').appendChild(node);
  ;
}
   
   
 

   
 
 }

 
 


function App() {

  return (
  
    

    <div className="content">

      

<div className = 'perfil'>

<ul >
   <li><a id='linkPerilCadastro' href="#"><img id="myImg"></img><span className ='avatarNome' id="name"></span></a></li>
   <li > <a id='linkPerilCadastro' href='./'>Home</a> </li>
   <li> <a id='linkPost' href='#'>Postar</a> </li>
   <li> <a href='#'>Sobre</a> </li>
   <li id='logout'> <a href='#' onClick={ logout()} ></a> </li>
   


</ul>

 </div>

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

    <Routes />  


      </div>
    
  );
}



export default App;
