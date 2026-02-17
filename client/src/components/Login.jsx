import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const Login = () => {
    const [state,setState]=useState('Login');
    const {setShowLogin,backendURL,setToken,setUser}=useContext(UserContext);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const onSubmitHandler=async (e)=>{
      e.preventDefault();
      console.log("🟢 Form submitted in state:", state); 
      try{
        if(state==='Login'){
          const {data}=await axios.post(backendURL+'/api/user/login',{email,password});
          if(data.success){
               
               console.log("✅ Login successful:", data.user);
               setToken(data.token);
               setUser(data.user);
               localStorage.setItem('token',data.token);
               setShowLogin(false);
          }
          else{
            toast.error(data.message);
          }
        }
        else{
          const {data}=await axios.post(backendURL+'/api/user/register',{name,email,password});
          if(data.success){
               setToken(data.token);
               setUser(data.user);
               localStorage.setItem('token',data.token);
               setShowLogin(false);
          }
          else{
            toast.error(data.message);
          }
        }
      }
      catch(error){
        toast.error(error.message);
      }
    }
    useEffect(()=>{
        document.body.style.overflow='hidden';

        return()=>{
            document.body.style.overflow='unset';
        }
    })
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-sm bg-black/30 flex justify-center items-center'>
        <form className='relative bg-white rounded-xl p-10 text-slate-500' onSubmit={onSubmitHandler}>
            <h1 className='text-center text-3xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>

           { state!=='Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.profile_icon} alt="user" width={20}></img>
                <input onChange={e=>setName(e.target.value)} value={name} type="text" placeholder='Full Name' required className='outline-none text-sm'/>
            </div>} 
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="user" width={20}></img>
                <input onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required className='outline-none text-sm'/>
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="user" width={20}></img>
                <input onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='outline-none text-sm'/>
            </div>
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password</p>
            <button className='bg-blue-600 w-full text-white py-2 rounded-full' type="submit">{state==='Login'?'Login':'Create Account'}</button>

          { state==='Login'?<p className='mt-5 text-center'>Don't have an account?<span className='text-blue-600 cursor-pointer'
            onClick={()=>(setState('SignUp'))}>SignUp</span></p>
             :
            <p className='mt-5 text-center'>Already have an account?<span className='text-blue-600 cursor-pointer'
            onClick={()=>(setState('Login'))}> Login</span></p>
          }

            <img src={assets.cross_icon} alt="cross" className='absolute top-5 right-5 cursor-pointer' onClick={()=>setShowLogin(false)}></img>
        </form>
    </div>
  )
}

export default Login