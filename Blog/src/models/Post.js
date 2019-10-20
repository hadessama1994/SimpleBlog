const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
var PostSchema = new Schema({
    title: {
      type: String,
      required: true,      
    },
    posttext: {
      type: String,
      required: true,          
    },
      tags: {type: [String] },
     
      userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    avatarid: {
      type: Schema.Types.ObjectId,
      ref: "File"
  },
    created_at: { 
      type: Date, default: Date.now 
   },
    

  });
  
  module.exports = mongoose.model('Post', PostSchema);
  