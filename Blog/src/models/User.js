const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require ('bcryptjs')
var uniqueValidator = require('mongoose-unique-validator')
 
var UserSchema = new Schema({
     
  email: {
      type: String,
      required: true,
      unique: true,
      trim: true
      },  

 username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
  password_hash: {
      type: String,
      required: true,
      
    },

  created_at: { 
     type: Date, default: Date.now 
  },

  
  
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true } //pra poder retornar JSON nas virtuals
});

  UserSchema.virtual('password').set(function(value) {
    const salt = bcrypt.genSaltSync(10)
    this.password_hash= bcrypt.hashSync(value, salt)
   
  })

  

//comparar o PASSWORD digitado com o HASH
UserSchema.methods.comparePassword= async function(normalPassword, callback) {
  return callback(null, bcrypt.compareSync(normalPassword, this.password_hash))
}   


//UPDATE DO PASSWORD


  


  module.exports = mongoose.model('User', UserSchema);
  