import React from 'react'
import { assets } from '../assets/admin/assets'
const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
          {/*---Left section*/ }
            <div>
                <img className='mb-5 w-40' src={assets.admin_logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6 '> Prescripto doctors are the ones who support when someone is struggling with their health.Our Doctors are the ones to have a profound knowledge of all kinds of diseases, their symptoms, and their treatments.</p>
            </div>
            
          {/*---Center section*/ }
             <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/'>About us</a></li>
                    <li><a href='/'>Contact us</a></li>
                    <li>Privacy policy</li>
                </ul>
             </div>
                
         {/*---Right section*/ }
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul  className='flex flex-col gap-2 text-gray-600'>
                    <li>+12-9035797067</li>
                    <li>29marees@gmail.com</li>
                </ul>
            </div>
        </div>
          {/*----Copyright text */}
          <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@Hcare-Prescripto - All Rights Reserved</p>
          </div>
    </div>
  )
}

export default Footer