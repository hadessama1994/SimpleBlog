import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from "./services/auth"

import login from './pages/login'
import dashboard from './pages/dashboard'
import posts from './pages/posts' 
import profile from './pages/profile' 
import cadastro from './pages/cadastro' 
 
//

           
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
  
export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
        
        <Route path ="/" exact component = {posts}/>
        <Route path ="/login" component = {login}/> 
        <Route path ="/dashboard" component = {dashboard}/>
        <Route path ="/profile" component = {profile}/>
        <Route path ="/cadastro" component = {cadastro}/>

        

        </Switch>
        </BrowserRouter>
    )
}
