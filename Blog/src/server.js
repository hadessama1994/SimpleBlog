var cors = require ('cors');
var express = require('express');
var app = express();
const mongoose = require('mongoose');
const path = require ('path')



  app.use(cors())


app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')))

mongoose.connect('mongodb+srv://hades:84236158@hades-gh1yf.mongodb.net/blog?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(require('./routes/routes.js')) //as rotas do app em routes.js


app.listen(4005)
console.log("...RODANDO...");





module.exports = app;