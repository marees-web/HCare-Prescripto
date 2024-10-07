import React,{useState} from 'react'
import {assets} from '../assets/admin/assets'
import { assetts } from '../assets/frontendass/assetts'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate=useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.admin_logo}/>
        <ul className='hidden md:flex item-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token ?
                 <div className='flex items-center group relative gap-2 cursor-pointer'>
                   <img  className=' w-8  rounded-full'src={assetts.profile_pic} alt=''/>
                   <img className='w-2.5 '  src={assetts.dropdown_icon} alt=''/>
                   <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-500 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded-lg flex flex-col gap-4 p-4'>
                        <p onClick={()=>navigate('/my-profile')} className='px-5 hover:text-black hover:bg-primary cursor-pointer hover:rounded'>My Profile</p>
                        <p onClick={()=>navigate('/my-appointments')} className='px-2 hover:text-black hover:bg-primary cursor-pointer hover:rounded'>My Appointments</p>
                        <p onClick={()=>setToken(false)} className='px-5 hover:text-black hover:bg-primary cursor-pointer hover:rounded'>Logout</p>
                    </div>
                   </div>
                </div>
                 :
                <button onClick={()=>navigate('/login')} 
                className='bg-primary text-white px-8 py-3 rounded-full font-medium hidden md:block hover:bg-hover'>Create Account</button>
            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assetts.menu_icon} alt="" />
                            {/*---mobile menu --- */}
             <div className={` ${showMenu ? 'fixed w-full ' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.admin_logo} alt="" />
                    <img className='w-7' onClick={()=>setShowMenu(false)} src={assetts.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink className='w-full' onClick={()=>showMenu(false)} to='/'> <p className='px-4 py-2 rounded w-full bg-gray-200 '>HOME</p></NavLink>
                    <NavLink className='w-full' onClick={()=>showMenu(false)}  to='/doctors'> <p className='px-4 py-2 rounded w-full bg-gray-200 '>ALL DOCTORS</p></NavLink>
                    <NavLink className='w-full' onClick={()=>showMenu(false)}  to='/about'> <p className='px-4 py-2 rounded w-full bg-gray-200 '>ABOUT</p></NavLink>
                    <NavLink className='w-full' onClick={()=>showMenu(false)}  to='/contact'> <p className='px-4 py-2 rounded w-full bg-gray-200 '>CONTACT</p></NavLink>
                </ul>
             </div>
        </div>
    </div>
  )
}

export default Navbar