const mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    nickName:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        // required:true,
    },
},{
    timestamps:true,
});

module.exports=mongoose.model('User',userSchema);