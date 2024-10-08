import React,{useState} from 'react';
import {assets} from "../assets/admin/assets"

const Login = () => {
    const [state, setState] = useState('Admin');
  return (
    <form className='min-h-[80vh] flex items-center' >
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-500 text-sm shadow-lg'>
            <p className='text-3xl font-bold m-auto'><span className='text-primary'>{state} </span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
            </div>
            <button className='bg-primary text-white font-semibold w-full py-2 rounded-md transition-all duration-300 hover:scale-105'>Login</button>
            {
                state === 'Admin' ?
                <p>Doctor Login ? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p> 
                : <p>Admin Login ? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p> 
            }
        </div>

    </form>
    
  )
}

export default Login