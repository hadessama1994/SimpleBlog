const User = require ('../models/User')
const File = require ('../models/File')
const bcrypt =require ('bcryptjs')




module.exports = {
    

    /////////////////////CRIACAO DE USUARIO/////////////////////////
    
    async store (req, res){

        async function exibirUserCriado (){ //função chamada pra criar usuario
            
            const {id, username, email} = await User.create(req.body) //nao retornar a senha.
            //a senha está implicita no req.body, ao chegar no controller ela é virtual onde é codificada para passowrd_hash
            
            await File.create({ //toda vez que um usuário é criado, a imagem padrao é dada a ele ate que ele faça upload de outro avatar
            userid: id,
            name : 'padrao.png',
            path : '/images.png'
            })
            
            return res.json({
                id,
                username,
                email,               
            
            })

        
        }


        const {username, email} = req.body
        
        let user = await User.findOne({username}) //procurar no BD se ja tem nome digitado
        let mail = await User.findOne({email}) //procurar no BD se ja tem email digitado
        
         

        if (!user){  //vai verificar se ja tem email e user cadastrados
            if(!mail) {   
                exibirUserCriado();  //funcao pra criar user, caso email ou usuario ja nao exista
            }  
            else{return res.status(400).json({error: 'Email already taken'})}          
           
        }       
        else {return res.status(400).json({error: 'User already taken'})}
    
    },     
        
    ///////////////////EDITAR USER//////////////////////////////////

     async update (req, res) {
        
        const {email, oldPassword, username, password} = req.body
        let passwordHash //variavel de hash
        
        const user = await User.findById (req.userId)//req.userID vem do middleware de token, assim podemos achar todo o usuario pelo ID
        
        
        
        //verificar email
        if(email != user.email){                    //verifica se o email no body é diferente do email que está sendo digitado, 
         let mail = await User.findOne({email})     //pois se ele digitar o mesmo email nada acontece
            if(mail){ 
                return res.json({error: 'Email already taken'}) //vai procurar o email no BD se ja existir nao podera ser alterado
            }
        }
        //verificar username
        if(username != user.username){  //faz a mesma verificacao do email
            let userName = await User.findOne({username}) //procurando se ja tem esse username
            if(userName){ 
                return res.json({error: 'User already taken'})//se tiver acontece isso
            }
        }


        //verificar senha

        if(oldPassword){ //ele PODE ou NAO digitar a senha antiga para alterar, precisa verificar se ele digitou
        await user.comparePassword(oldPassword, (error, match) => {
            //essa func vai comprar a senha digitada com a hash do usuário todo puxado pelo {username}
                  
            if(!match) {   //se nao bater a senha antiga esta errada e nao bate com a senha atual
                return res.json({ error: "Old password does not match" })
            }

        })
    }
    
    
    if(password){ //password = senha nova a ser trocada
        passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10)) //se tiver alguma senha nova digitada ela vai ser encriptada 
        
    }else{passwordHash = user.password_hash} //se nao tiver ele vai manter a senha hasheada antiga
        
        
        await user.update({ 
           password_hash: passwordHash, //ele vai passar a NOVA SENHA já hasheada, mas se ele não digitar ele vai passar a senha antiga
           username,
           email
          })      


        return res.json({username, email})  
        
       }

}