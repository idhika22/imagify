import userModel from "../models/userModel.js";
import FormData from "form-data"
import axios from 'axios'
const imageGenerate=async (req,res)=>{
   try{
    const {prompt}=req.body;
    const userId=req.user?.userId;
   const user=await userModel.findById(userId);

    if(!user||!prompt){
       return res.json({success:false,message:"Missing details"});
    }
    

    if(user.creditBalance<=0){
       return res.json({success:false,message:"No Credit balance",creditBalance:0,});
    }
     const formData=new FormData();
     formData.append("prompt",prompt);

     const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
        headers: {
            'x-api-key': process.env.CLIPDROP_API,
          },
          responseType:'arraybuffer'
     })
     const base64Image=Buffer.from(data,'binary').toString('base64');
     const resultImage=`data:/image/png;base64,${base64Image}`
      
     await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1});
     user.creditBalance-=1;
     res.json({success:true,message:"Image Generated",creditBalance:user.creditBalance,resultImage});
   } 
   catch(error){
      console.log(error);
      res.json({success:false,message:error.message});
    }

   }
   
   export {imageGenerate};
