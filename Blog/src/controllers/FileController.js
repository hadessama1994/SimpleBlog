const File = require ('../models/File')

module.exports={

    async store(req,res){
        const {originalname: name, filename: path} = req.file //atributos do arquivo de img

        const file = await File.create({
            userid: req.userId,
            name,
            path, 
        })
        return res.json(file)

    },


    async update(req,res){
        const {originalname: name, filename: path} = req.file //atributos do arquivo de img

        const file = await File.findOne({'userid' : req.userId})  

        await file.update({
            userid: req.userId,
            name,
            path : 'http://localhost:4005/files/' + path 
        })
        return res.json(file)
    }



    

}