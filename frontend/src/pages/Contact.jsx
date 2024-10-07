import React from 'react'
import { assetts } from '../assets/frontendass/assetts'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xlpt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full rounded-md md:max-w-[360px]' src={assetts.contact_image} alt="" />
        <div className='flex flex-col items-start justify-center gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
          <p className='text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className='text-gray-500'>Tel: (415) 555‑0132 <br />29marees@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border rounded-lg border-black px-8 py-4 text-sm hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact