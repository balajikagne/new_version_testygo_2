const express =require("express")
const router=express.Router();
const Items=require('../mongocom/menuCard')

router.get('/getallitems',async (req,res)=>{
    try{
        const Item=await Items.find({});
        res.send(Item)
    }
    catch(error){
        return res.status(400).json({message:error})
    }
})
router.post('/additem',async (req,res)=>{
    const {name,img,prices,rate}=req.body
    const newItems= new Items({name,img,prices,rate})
    try{
        await newItems.save()
        res.status(201).send("New Pizza Added")
    }
    catch(error){
        return res.status(400).json({message:error})
        error:error.stack
    }
})

// router.post('/getitembyid',async (req,res)=>{
//     const itemid=req.body.itemid
//     try{

//         const item= await newItems.findOne({_id:itemid})
//         res.status(201).send("New Pizza Added")
//     }
//     catch(error){
//         return res.status(400).json({message:error})
//         error:error.stack
//     }
// })

router.post('/deleteitem',async (req,res)=>{
    const itemId=req.body.itemId;
    console.log(itemId);
    console.log("hellow world")
    try{

        await Items.findOneAndDelete({_id:itemId})
        res.status(201).send("Item deleted")
        
    }
    catch(error){
        res.status(400).json({message:error})
        error:error.stack
       
    }
})
module.exports=router;