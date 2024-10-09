import React, { useContext } from 'react'
import { assets } from '../assets/admin/assets'
import { AdminContext } from '../context/adminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext);
    const navigate=useNavigate()

    const logout=()=>{
        navigate('/')
      aToken && setAToken('')
      aToken  && localStorage.removeItem('aToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 font-semibold text-xs'>
            <img className='w-36 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white font-medium text-sm px-10 py-2 rounded-full transition-all duration-300 hover:scale-105'>Logout</button>
    </div>
  )
}

export default Navbar