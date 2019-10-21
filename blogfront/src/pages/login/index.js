import React, {useState, Component} from 'react';
import api from '../../services/api';
import { Link, withRouter } from "react-router-dom";
import { login } from "../../services/auth";
import './style.css';

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
            this.props.history.push("./");
            document.location.reload(true)
          } catch (err) {

            document.getElementById('eventoerro').append("Houve um problema com o login, verifique suas credenciais.");
            


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

        
        
        
        
       
            


        <form  className='form' onSubmit={this.handleSubmit}>
        <h1>Digite o <strong>usuario</strong> e <strong>Senha</strong> cadastrados! </h1>
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

                <button>Entrar</button>
                <h2 className='erromsg' id='eventoerro'></h2>
                <h2>Ainda não é cadastrado? <a href='./cadastro'>Clique aqui!</a></h2>
            
        </form>

        

        </>
    )
        }
    }

    export default withRouter (Login)