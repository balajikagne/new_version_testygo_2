const mongoose=require("mongoose")

const UoodSchema=new mongoose.Schema({
    name:{type:String,require},
    _id:{type:String},
    varients:[],
    prices:[],
    img:{type:String,require},
    dsc:{type:String,require},
    rate:{type:Number,require},
    country:{type:String}
},{
    timestamps:true,
})

let UenCard=new mongoose.model("menus",UoodSchema)
module.exports= UenCard;