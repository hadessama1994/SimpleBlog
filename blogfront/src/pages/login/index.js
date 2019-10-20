import React, {useState, Component} from 'react';
import api from '../../services/api';
import { Link, withRouter } from "react-router-dom";
import { login } from "../../services/auth";

class Login extends Component {
    state = {
      email: "",
      password: "",
      error: ""
    };
    


   handleSubmit = async e =>{
        
        e.preventDefault();
        const { username, password } = this.state;
        if (!username || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
          } else {
        try {
            const response = await api.post("/sessions", { username, password });
            login(response.data.token);
            this.props.history.push("/dashboard");
          } catch (err) {
            this.setState({
              error:
                "Houve um problema com o login, verifique suas credenciais."
            });
          }
        }
    }




       // const response = await api.post('/sessions', {username,password})
       // const{token} = response.data //response.data = parecido com req.body, mas ele pega tudo que foi respondido no JSON da API
       //vamos armazenar o token
       // localStorage.setItem('TOKEN_KEY', token)
  
       //    }



    render() {
        return(
        <>

        
        <center>
        <p>
        Digite o <strong>usuario</strong> e <strong>Senha</strong> cadastrados! 
       
            </p></center>


        <form onSubmit={this.handleSubmit}>
            <label htmlFor="inp" className="inp">
                <input type = "text"
                 id = "usuario" 
                 placeholder="" 
                 autoComplete="off" 
                 onChange={e => this.setState({ username: e.target.value })} />
                <label className="label" htmlFor="mail"> USER </label>
            </label>

            <label className="inp">
                <span className="border"></span>    
                <input type = "password"
                 id = "senha" 
                 placeholder=""
                 autoComplete="off"
                 onChange={e => this.setState({ password: e.target.value })}/>
                <label className="label" htmlFor="mail"> SENHA  </label>
            </label>

                <center><button>Entrar</button></center>
            
        </form>

        

        </>
    )
        }
    }

    export default withRouter (Login)