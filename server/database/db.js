const mongoose = require('mongoose');

const uri ="mongodb+srv://khushboo123:ukp123@cluster0.hhsax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const conn = mongoose.connect(uri,(err)=>{
   if(err){
       throw err;
   }
   console.log('MongoDB connected')
})

module.exports = conn;