const express=require('express');
const router =express.Router();
const User=require("../mongocom/userModel");

router.post("/register",(req,res)=>{
    const {name,email,password}=req.body
    const newUser= new User({name,email,password})

    try {
        newUser.save()
        res.send('User Registered successfully')
    }
    catch(error)
    {
        return res.status(400).json({message:error})
    }
});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user =await User.find({email,password})

        if (user.length>0){
            const currentUser={
                name:user[0].name,
                email:user[0].email,
                isAdmin:user[0].isAdmin,
                _id:user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(400).json({message :'User Login Failed'});
        }
    }catch(error)
    {
        return res.status(400).json({massage:'Something went wrong'});
    }
})

// router.get("/getallusers", async (req,res)=>{
//     try{
//         const users=User.find({})
//         res.status(200).send(users);
//     }
//     catch(error){
//         res.status(404).json({message:error.stack})
//     }
// })
module.exports=router;