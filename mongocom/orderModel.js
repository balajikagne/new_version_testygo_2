const mongoose =require ("mongoose")
const orderSchema=new mongoose.Schema({
    name:{type:String,require},
    email:{type:String,require},
    userid:{type:String},
    orderItems:[],
    orderAmount:{type:Number},
    shippingAddress:{type:Object,require},
    isDelivered:{type:Boolean,require,default:false}
},{
    timestamps:true
})

module.exports=new mongoose.model('userorders',orderSchema)