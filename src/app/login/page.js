import Login from '@/components/auth/Login'
import React from 'react'
import Image from 'next/image' 


const page = () => {
  return (
   <div 
   className='h-screen w-screen overflow-hidden items-center justify-center relative'
    >

      <Image
        src="/bg_2.jpg"
        alt="Background image"
        width={1920}
        height={1080}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50  grayscale brightness-125  blur-xs  -z-10"
      />  
      <div className=" pt-2 " >

      <Login/>
      </div>
     
    </div>
  )
}

export default page