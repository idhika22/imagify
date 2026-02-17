import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
const Header = () => {
     const {user,setShowLogin}=useContext(UserContext);
     const navigate=useNavigate();
    const onClickHandler=()=>{
        if(user){
            navigate('/result') 
        }
        else{
            setShowLogin(true);
        }
    }
  return (
    <motion.div  
     initial={{opacity:0.2,y:100}} transition={{duration:1}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
        className='flex flex-col justify-center items-center text-center my-20'>
        <div className=' text-stone-800 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 '>
            <p>Best text to image generator</p>
            <img src={assets.star_icon} alt="star"></img>
        </div>
        <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to 
            <span className='text-blue-600'> image</span>, in seconds</h1>
        <p className='text-center mt-5 max-w-xl mx-auto'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen</p>
        <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full' 
          onClick={onClickHandler}>
            Generate Images
            <img src={assets.star_group} alt="star" className='h-6'></img>
        </button>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:0.1}} 
           className='flex flex-row mt-10 gap-3'>
            {Array(6).fill('').map((item,index)=>(
             < motion.img whileHover={{scale:1.05,duration:0.1}} src={assets.sample_img_1} alt="image" key={index} width={70} 
             className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'></motion.img>
            ))}
        </motion.div>
    </motion.div>
  )
}

export default Header