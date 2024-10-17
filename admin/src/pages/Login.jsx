import React,{useContext, useState} from 'react';

import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

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
    
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-white text-sm shadow-2xl'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary text-2xl font-bold'>{state}</span> Login</p>
        <div className='w-full relative'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] text-black rounded w-full p-2 mt-1' type="email" required />
          <MdEmail className="absolute top-[35px] right-0 w-20 h-5 text-primary rounded-full" />
        </div>
        <div className='w-full relative '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border text-black border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
          <FaLock className="absolute top-[35px] right-0 w-20 h-5 text-primary rounded-full" />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state === 'Admin'
            ? <p className='text-primary font-semibold text-lg'>Doctor Login? <span onClick={() => setState('Doctor')} className='text-white underline font-bold text-xl cursor-pointer'>Click here</span></p>
            : <p className='text-primary font-semibold text-lg'>Admin Login? <span onClick={() => setState('Admin')} className='text-white underline font-bold text-xl cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
    
    
  )
}

export default Login