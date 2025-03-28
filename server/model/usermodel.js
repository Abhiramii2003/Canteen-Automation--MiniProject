const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      role:{type:String,required:true,default:"user"},
      profileImage:{type:String},
      status:{type:String,required:true,default:"Active"}
    },
    { timestamps: true }
  );
  const Users = mongoose.model("Users", userSchema);
  
  module.exports=Users