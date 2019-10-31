//index = metodo que vai retornar listagem
//store = criar sessao
//show = listar uma unica sessao
//update atualizar sessao
//destroy deletar sessao


const Post = require('../models/Post')
const File = require('../models/File')



module.exports={
    
    async index (req,res){
        const{tags} = req.query //se passar um query vazio 
        const post = await Post.find({tags}) //ele vai buscar todos os posts
        console.log (post)  
        return res.json(post) //mostrar todos os posts
        
    },
    async show (req,res){

        const post = await Post.find({}).populate({path: 'userid', select: 'username'}).populate({path: 'avatarid', select : 'path'}) 
        //ele vai buscar todos os posts, e pegar o USERID 
                                                                                      //referenciado e selecionar o username dentro de Users
        post.reverse();
        
        return res.json({post}) //mostrar todos os posts
          
        

    },

    async store (req,res){
        const {title,posttext,tags} = req.body
         // pegar seu username e usar como tag author
         
        const avatarid = await File.findOne({'userid': req.userId})
        

        const post = await Post.create({
            userid: req.userId, //userID vindo do middleware do token, assim vai bater com o usuario logado como dono do post
            title,
            avatarid,
            posttext,
            tags: tags.split(',').map(tags => tags.trim()), //dividir as tags por virgula
          })
         
        return res.json(post)
    
    }

}