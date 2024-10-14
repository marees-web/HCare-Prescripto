import React, { useContext,useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/admin/assets';

const DoctorAppointments = () => {
    const { dToken,appointments,getAppointments,completeAppointment,cancelAppointment}=useContext(DoctorContext);
    const{  calculateAge,slotDateFormat,currency}=useContext(AppContext)

    useEffect(() => {
        if(dToken){
            getAppointments()
        }
    }, [dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-2xl font-medium bg-primary text-white px-6 py-3 rounded'>All Appointments</p>
        <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]'>
            <div className='max-sm:hidden grid  grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 px-6 py-3 border-b'>
                <p>#</p>
                <p>Patient</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Fees</p>
                <p>Action</p>
            </div>
            {
                appointments.map((item,index)=>(
                    <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 px-6 py-3 border-b hover:bg-gray-100' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img className='w-14 rounded-full' src={item.userData.image} alt="" />
                            <p>{item.userData.name}</p>
                        </div>
                        <div >
                            <p className='text-xs inline border border-primary px-2   rounded-full'>{item.payment ? "Online" : "CASH"}</p>
                        </div>
                        <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                        <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                        <p>{currency}{item.amount}</p>
                        {
                            item.cancelled 
                            ? <p className='text-red-500 font-medium text-xs'>Cancelled</p>
                            : item.isCompleted 
                            ? <p className='text-green-500  font-medium text-xs'>Completed</p>
                            :  <div className='flex'>
                            <img className='w-10 cursor-pointer' onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                            <img className='w-10 cursor-pointer' onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" />
                        </div>

                        }
                       
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default DoctorAppointments