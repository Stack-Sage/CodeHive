import React from 'react'

import { useRouter } from 'next/navigation'

const Explore = () => {
   const router = useRouter()

  return (
    <div>
      
      <h1 className="text-4xl font-bold text-center mt-10 text-gray-900">Get Started !</h1>


      <div className='flex gap-10 justify-center '>

      <button 
      className=' mt-10 px-6 py-3 bg-white/80 text-black rounded-lg hover:ring-1 hover:scale-105 transition-all duration-300 ease-out'
      onClick={() => router.push('/student')}>
        Join as Student
      </button>

      <button 
      className=' mt-10 px-6 py-3  bg-white/80  hover:ring-1 text-black hover:scale-105 rounded-lg  transition-all duration-300 ease-out'
      onClick={() => router.push('/register')}>
        Join as Teacher
      </button>
      </div>

    </div>
  )
}

export default Explore