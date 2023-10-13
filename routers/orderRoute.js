const express =require('express');
const router=express.Router();
const {v4:uuidv4}=require('uuid')
const stripe=require("stripe")("sk_test_51NwHTvSHlzVzn0aLuKa3wFcz7By51dAz0kN5AINpVIplAeX1Ew2GhBjDtb71YYBRMT2R3p0k0Rotb26Nzd2JYMfV00ZnBS4bhe");
const Order=require("../mongocom/orderModel")
router.post("/placeorder",async(req,res)=>{
    const {token,subtotal,currentUser,cartItems}=req.body;
    try{
        // const customer=await stripe.customers.create({
        //     email:token.email,
        //     source:token.id
        // });
        if (token.city=="pune"){
            const newOrder=new Order({
                name:currentUser.name,
                email:currentUser.email,
                userid:currentUser._id,
                
                orderItems:cartItems,
                orderAmount:subtotal,
                shippingAddress:{
                    street:token.shippingAddress,
                    city:token.city
                    ,
                    pincode:token.pincode
                    ,
                    mobile:token.mobNumber
                },
            });
            newOrder.save();
            res.send("PAYMENT SUCCESSFULLY")
        }else{
            res.send("PAYMENT FAILED")
        }
    }catch(error)
    {
      res.status(400).json({
            message:'Something wend wrong',
            error:error.stack
        })
    }
})
router.post("/getuserorder",async (req,res)=>{
    const {userid}=req.body;
    try{
        const orders=await Order.find({userid:userid}).sort({_id:"-1"});
        res.status(200).send(orders);
    }
    catch(error)
    {
        res.status(200).json({
            message:"something went wrong",
            error:error.stack,
        })
    }
})
router.get("/getallorders",async (req,res)=>{
    try{
        const orders=await Order.find({})
        res.status(200).send(orders);
        console.log(orders);
    }
    catch(error){
        res.status(400).json({
            message:"something went wrong",
            error:error.stack,
        });

    }
})
router.post("/deliverorder",async (req,res)=>{
    const orderid=req.body.orderid
    try{
        const orders=await Order.findOne({_id:orderid})
        orders.isDelivered=true
        await orders.save()
        res.status(200).send("order deliverd succussfully");
        console.log(orders);
    }
    catch(error){
        res.status(400).json({
            message:"something went wrong",
            error:error.stack,
        });

    }
})
module.exports=router