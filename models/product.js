const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    descriptions:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:10
    },
    price:{
        type:Number,
        required:true,
        default:0.00
    },
    converImg:{
        type:String,
    }
},{
    timestamps:true,
});

module.exports=mongoose.model('Product',productSchema)