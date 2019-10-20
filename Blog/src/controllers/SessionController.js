const User = require ("../models/User")
const File = require ("../models/File")
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')


//é o login do usuario já cadastrado, nao confundir com UserController onde é o CADASTRO em sí do usuario

module.exports = {
async store (req,res){
    const {username,password} = req.body 

    const user = await User.findOne({username}) //procurar todas as info do usuario no BD pelo username

    if (!user){ //se nao tiver nenhum username no BD compativel com o digitado ele volta nulo
        //entao se nao achar nenhum usuario caimos aqui
        return res.status(401).json({error: 'User is not registered'}) //se nao bater é por que nao existe tal usuario
    }

    //VERIFICAR SE A SENHA BATE COM O USUARIO
    await user.comparePassword(password, (error, match) => {
        //vai comprar a senha digitada com a hash do usuário todo puxado pelo {username}
        //essa comparação é feita no model User mesmo
              
        if(!match) {
            return res.status(400).json({ error: "The password is invalid" }) //caso nao bata 
        }

        const {id, email} = user
        return res.json({ //exibir o login feito
        user: {
            id,
            username,
            email,
        },
        token: jwt.sign({ id }, authConfig.secret, {expiresIn: authConfig.expiresIn}), //token gerado para se passar pelo header no middleware

            })
        
      })   

    },

    async index(req,res){

        //retornar dados da sessão como nome e avatar

        const userid = await User.findById(req.userId)
        const avatar= await File.find({"userid":req.userId})
        const {path} = avatar[0]
        
        res.json({userid, avatar:{
            path
        }})


        
    }
    
}