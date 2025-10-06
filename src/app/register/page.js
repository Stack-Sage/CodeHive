import Register from '@/components/auth/Register'
import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className='absolute top-0 z-50 min-h-screen min-w-screen flex items-center justify-center'
    >
    
      <Image
        src="/bg_2.jpg"
        alt="Background image"
        width={1920}
        height={1080}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50  grayscale brightness-125  blur-xs -z-10"
      />  
      <div className=" pt-4" >

      <Register/>
      </div>
     
    </div>
  )
}

export default page