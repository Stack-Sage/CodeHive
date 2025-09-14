import Register from '@/components/auth/Register'
import React from 'react'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
const page = () => {
  return (
    <div
    >
       <Toaster position="bottom-right"  />
      <Image
        src="/bg_2.jpg"
        alt="Background image"
        width={1920}
        height={1080}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10 grayscale blur-[1px] -z-10"
      />  
      <div className=" pt-16" >

      <Register/>
      </div>
     
    </div>
  )
}

export default page