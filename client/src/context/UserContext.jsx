import axios from 'axios';
import React,{createContext,useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext=createContext();

export const UserProvider=({children})=>{
 const [user,setUser]=useState(null);
 const [showLogin,setShowLogin]=useState(false);
 const [token,setToken]=useState(localStorage.getItem('token'));
 const [credit,setCredit]=useState(null);

 const backendURL=import.meta.env.VITE_BACKEND_URL;
  const navigate=useNavigate();
 useEffect(()=>{
  const fetchUserCredits= async()=>{
    if(!token) return;
    try{
        const {data}=await axios.get(backendURL+'/api/user/credits',{headers:{token}});
        if(data.success){
          setCredit(data.credits);
          console.log("Fetched credit:", data.credits);

        }
        else{
          console.log("Failed to fetch credits:", data.message);
        }
    }
    catch(error){
      console.log(error)
    }
  }
  fetchUserCredits();
 },[token])

 const generateImage=async(prompt)=>{
  try{
     const {data}=await axios.post(backendURL+'/api/image/generate-image',{prompt},{headers:{token}});
     if(!data.success){
      if(credit==0){
        navigate('/buy');
      }
      return null;
     }
     setCredit(data.creditBalance);
     return data.resultImage;
  }
  catch(error){
    console.log(error);
  }
 }

 
 return(
    <UserContext.Provider value={{user,setUser,showLogin,setShowLogin,backendURL,token,setToken,credit,setCredit,generateImage}}>
      {children}
    </UserContext.Provider>
 );
};