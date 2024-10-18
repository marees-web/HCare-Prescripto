import React, { useContext,useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const {doctors,aToken,getAllDoctors,changeAvailability}=useContext(AdminContext);

  const [currentPage,setCurrentpage]=useState(1);
  const[docPerPage,setDocPerpage]=useState(5);
  useEffect(() => {
    if(aToken){
      getAllDoctors()
    }
    
  }, [aToken])

  const indexofLastdoc=currentPage * docPerPage;
  const indexOfFirstDoc=indexofLastdoc - docPerPage;
  const currentDoc=doctors.slice(indexOfFirstDoc,indexofLastdoc);
  const totalpages=Math.ceil(doctors.length/docPerPage);

  const paginate=(page)=>setCurrentpage(page)
  return (
    <div className='m-5 max-h[100vh] '>
       <p className='mb-3 text-2xl font-medium  bg-primary text-white px-6 py-3 w-full  rounded'>All Doctors</p>
       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-8'>
        {
          currentDoc.map((item,index)=>(
            <div className='border border-black shadow rounded-xl max-w-56 overflow-hidden cursor-pointer group  hover:border-primary hover:shadow-xl' key={index}>
              <img className='max-w-52 max-h-56 group-hover:scale-105 transition-all duration-300' src={item.image} alt="" />
              <div className='p-4 mt-3'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available}/>
                  <p>Available</p>
                </div>
              </div>

            </div>
          ))
        }
        
       </div>
       <div className='flex justify-center mt-10 ml-0 h-50 '>
         <button className='bg-gray-400 border rounded px-4 py-2 text-black text-lg font-medium hover:bg-primary hover:text-white hover:scale-75 transition-all duration-150' onClick={()=>paginate(1)}>First</button>
         <button className='bg-gray-400 border rounded px-4 py-2 text-black text-lg font-medium hover:bg-primary hover:text-white hover:scale-75 transition-all duration-150' disabled={currentPage === 1} onClick={()=>paginate(currentPage -1)}>Prev</button>
         {new Array(totalpages).fill(0).map((_,index)=>{
          return <button className={currentPage === index+1 ? "bg-primary border rounded px-4 py-2 text-black text-lg font-medium hover:scale-75 transition-all duration-150 " : "bg-gray-400 border rounded px-4 py-2 text-black text-lg font-medium hover:bg-primary hover:text-white hover:scale-75 transition-all duration-150"} onClick={()=>paginate(index + 1)} key={index + 1}>{index + 1}</button>
         })}
         <button className='bg-gray-400 border rounded px-4 py-2 text-black text-lg font-medium hover:bg-primary hover:text-white hover:scale-75 transition-all duration-150' disabled={currentPage === totalpages} onClick={()=>paginate(currentPage + 1)}>Next</button>
         <button className='bg-gray-400 border rounded px-4 py-2 text-black text-lg font-medium hover:bg-primary hover:text-white hover:scale-75 transition-all duration-150' onClick={()=>paginate(totalpages)}>Last</button>
       </div>
    </div>
  )
}

export default DoctorsList