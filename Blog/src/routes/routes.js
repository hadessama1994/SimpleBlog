const express = require('express')
const router = express.Router()
const UserController = require ('../controllers/UserController.js')
const SessionController = require ('../controllers/SessionController.js')
const PostController = require ('../controllers/PostController.js')
const FileController = require ('../controllers/FileController.js')
const authMiddleware = require ('../middleware')

const multer = require ('multer')
const multerConfig = require('../config/multer')
const upload = multer(multerConfig)

//rotas do app

router.use(express.json())


router.get('/', (req,res) => {
            return res.send('Lara gostosona ')
})

//rotas
router.post('/users', UserController.store)
router.post('/sessions', SessionController.store)
router.get('/posts', PostController.show) // mostrar tudo os posts
router.get('/posts',authMiddleware.authHeader, PostController.index) //pegar por tag


//middleware - must be logged to post
router.get('/sessions',authMiddleware.authHeader, SessionController.index) 
router.post('/posts',authMiddleware.authHeader, PostController.store)
router.put('/users',authMiddleware.authHeader, UserController.update)
router.put('/files',authMiddleware.authHeader, upload.single('file'), FileController.update)

module.exports = router