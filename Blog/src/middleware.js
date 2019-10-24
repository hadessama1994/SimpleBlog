    const jwt = require ('jsonwebtoken')
    const authConfig = require ("./config/auth")

    module.exports = {
        authHeader(req,res,next){
        const authHead = req.headers.authorization //token passado pelo header
        console.log(authHead)
        const bearer = authHead.split(' '); //separar o Bearer do token
        const token = bearer[1]; //pegar o token sem o Bearer

        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' }) //caso o token nao seja apresentado 

        req.token = token;
           
        jwt.verify(token, authConfig.secret, function(err, decoded) { //verificar com o arquivo de autorizacao
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }); //caso o token esteja errado
                  
            req.userId = decoded.id // se nao vai passar o ID do usuario autenticado pelo id que pode 
                                     //ser usado nas rotas depois desse middleware
            
            next()
        
        })

    }
    }
