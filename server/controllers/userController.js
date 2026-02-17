import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import bcrypt, { genSalt } from 'bcrypt'

  const registerUser= async (req,res)=>{
    try{
   const {name,email,password}=req.body;
   if(!name || !email || !password){
     return res.json({success:false,message:"Missing Details"});
   }
   
   const hashedPassword=await bcrypt.hash(password,10);
   const userData={
    name,
    email,
    password:hashedPassword
   }
   const newUser=new userModel(userData);
   const user=await newUser.save();

   const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
   res.json({success:true,token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
   });

}
catch(error){
      console.log(error);
      res.json({success:false,message:error.message});
}

}

 const loginUser= async (req,res)=>{
  try{
   const {email,password}=req.body;
   const user=await userModel.findOne({email});
   if(!user){
     res.json({success:false,message:"User does not exist"});
   }
   const isMatch=await bcrypt.compare(password,user.password);
   if(isMatch){
     const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
     res.json({success:true,token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
     });       
   }
   else{
     return res.json({success:false,message:"Invalid credentials"});
   }
 }
 catch(error){
   console.log(error);
   res.json({success:false,message:error.message});
 }
}

const userCredits= async (req,res)=>{
  try{
    const {userId} =req.user ;

  const user=await userModel.findById(userId);

  res.json({success:true,credits:user.creditBalance,name:user.name});
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message});
  }
  
}

export {registerUser,loginUser,userCredits};