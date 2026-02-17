import jwt from 'jsonwebtoken'

const userAuth=(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        res.json({success:false,message:"Not Authorised Login Again"});
    }
    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        if(decodedToken.id){
            req.user = { userId: decodedToken.id };
        }
        else{
            res.json({success:false,message:"Not Authorised Login Again"});
        }
        next();
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
    
}

export default userAuth;