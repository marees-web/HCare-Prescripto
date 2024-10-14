import React, { useContext,useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {
    const {dToken,profileData,setProfileData,getProfileData}=useContext(DoctorContext)
    const {currency,backendUrl}=useContext(AppContext)
    
    useEffect(() => {
       if(dToken){
        getProfileData()
       } 
    }, [dToken])
  return profileData && (
    <div className="w-full max-w-6xl m-5">
         <p className="mb-3 text-2xl font-medium bg-primary text-white px-6 py-3 w-full  rounded">
          Profile Information
        </p>
        <div className='flex flex-col gap-4 m-5'>
            <div>
                <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
            </div>
            <div className='flex-1 border border-stone-200 rounded-lg p-8 py-7 bg-white'>
                {/*---Doc info : name,degree,experience */}
                <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                <div className='flex items-center gap-2 mt-1 text-gray-600'>
                    <p>{profileData.degree}-{profileData.speciality}</p>
                    <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                </div>
                {/*---Doc About-- */}
                <div>
                    <p  className='flex items-center gap-1 text-md font-medium text-neutral-800 mt-3'>About:</p>
                    <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
                </div>
                <p className='text-gray-600 font-medium mt-4'>
                    Appointment Fees: <span className='text-gray-800'>{currency} {profileData.fees}</span>
                </p>
                <div className='flex gap-2 py-2'>
                    <p>Address:</p>
                    <p className='text-sm'>{profileData.address.line1}<br/> {profileData.address.line2}</p>
                </div>
                <div className='flex gap-1 pt-2'>
                    <input type="checkbox" />
                    <label htmlFor="">Available</label>
                </div>
                <button className='px-4 py-1 border border-primary text-md rounded-full mt-5 hover:bg-primary hover:text-white'>Edit</button>
            </div>
        </div>
    </div>
  )
}

export default DoctorProfile