import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
const Result = () => {
   const [image,setImage]=useState(assets.sample_img_1)
   const[loading,setLoading]=useState(false);
   const[input,setInput]=useState('');
   const {generateImage,credit}=useContext(UserContext);
   const navigate=useNavigate();
   const SubmitHandler= async(e)=>{
        e.preventDefault();
        if(credit<=0){
          navigate('/buy');
          return;
        }
        setLoading(true);
        if(input){
          const image=await generateImage(input);
          if(image){
            setImage(image);
          }
        }
        setLoading(false);
   }

   const handleClickAnother=()=>{
    setInput('');
    setImage(assets.sample_img_1);
    setLoading(false);
   }

   const handleDownload=async()=>{
         const response=await fetch(image);
         const Blob=await response.blob();
         
         const url=window.URL.createObjectURL(Blob);
         const link=document.createElement('a');

         link.href=url;
         link.download='imagify-image.png';

         document.body.appendChild(link);
         link.click();

         document.body.removeChild(link);
         window.URL.revokeObjectURL(url);
   }

  return (
    <form onSubmit={SubmitHandler} className='flex flex-col justify-center items-center min-h-[90vh]'>
    <div>
      <div className='relative'>
        <img src= {image} alt="image" className='max-w-sm rounded'></img>
      </div>
      <p className={!loading ? 'hidden':''}>Loading...</p>
    </div>

    <div className='flex w-full max-w-xl bg-neutral-500 text-white mt-10 text-sm p-0.5 rounded-full'>
      <input onChange={e=>setInput(e.target.value)} value={input} type='text' placeholder='Describe what you want' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'/>
      <button type='submit'className={`px-10 sm:px-16 py-3 rounded-full ${credit<=0? 'bg-gray-400 cursor-not-allowed':'bg-zinc-900 cursor-pointer'}`} >Generate</button>
    </div>

    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
      <p onClick={handleClickAnother}className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a  onClick={handleDownload} className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>
    </form>
  )
}

export default Result