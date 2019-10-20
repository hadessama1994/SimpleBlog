const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
var FileSchema = new Schema({
    name: {
      type: String,
           
    },
    path: {
      type: String,
              
    },
           
      userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    created_at: { 
      type: Date, default: Date.now 
   },
   
    url: {
      type: String,
      
    }

  });


  
  FileSchema.pre('save', function(next) {
    this.path = 'http://localhost:4005/files/' + this.path
    next();
  });
 
  
  module.exports = mongoose.model('File', FileSchema);
  