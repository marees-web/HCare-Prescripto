import React,{useContext, useState} from 'react';
import {assets} from "../assets/admin/assets"
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { MdAttachEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

const Login = () => {
    const [state, setState] = useState('Admin');

    const [email, setEmail] = useState('');
    const[password,setPassword]=useState('');

    const {setAToken,backendUrl}=useContext(AdminContext);
    const {setDToken}=useContext(DoctorContext)

    const onSubmitHandler=async(event)=>{
           event.preventDefault()
           try {
            if(state === 'Admin'){
               const {data}=await axios.post(backendUrl + '/api/admin/login',{email,password})
               if(data.success){
                localStorage.setItem('aToken',data.token)
                setAToken(data.token)
               }else{
                toast.error(data.message)
               }
            }else{
               const {data}=await axios.post(backendUrl + '/api/doctor/login' ,{email,password})
               if(data.success){
                localStorage.setItem('dToken',data.token)
                setDToken(data.token)
                console.log(data.token);
                
               }else{
                toast.error(data.message)
               }
            }
           } catch (error) {
            console.log(error)
            toast.error(error.message)
           }
    }

    
  return (
    <div  >
    <form onSubmit={onSubmitHandler} className='min-h-[100vh] flex items-center ' >
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-primary rounded-xl text-white text-xl shadow-3xl shadow-inner  bg-white/30'>
            <p className='text-3xl font-bold m-auto'><span className='text-primary'>{state} </span>Login</p>
            <div className='w-full relative'>
                <p className='text-lg font-medium'>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border outline-none border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                <MdAttachEmail className='absolute right-2 top-[45px] rounded-full bg-primary w-10' />
            </div>
            <div className='w-full relative'>
                <p className='text-lg font-medium'>Password</p>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className='border outline-none border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                <TbPasswordUser className='absolute right-2 top-[45px] bg-primary rounded-full w-10' />
            </div>
            <button className='bg-primary text-white font-semibold w-full py-2 rounded-md transition-all duration-300 hover:scale-105'>Login</button>
            {
                state === 'Admin' ?
                <p className='text-primary text-xl font-medium'>Doctor Login ? <span className='text-white font-semibold text-xl underline cursor-pointer ' onClick={()=>setState('Doctor')}>Click here</span></p> 
                : <p className='text-primary text-xl font-medium'>Admin Login ? <span className='text-white font-semibold text-xl  underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p> 
            }
        </div>

    </form>
    </div>
    
  )
}

export default Login