'use client'
import ListedEducators from '@/components/student/ListedEducators'
import Navbar from '@/components/student/SearchEducator'
import React from 'react'


const page = () => {

  return (
    <div className='flex flex-col justify-center items-center h-full '>
      
      <Navbar/>
     
      <div>
        <h1 className='text-3xl font-bold text-gray-700 text-center my-4 '>Explore Educators</h1>
        <p className='text-gray-600 flex flex-wrap mx-10 italic text-center  '>Connect with experienced educators to enhance your learning journey.</p>
      </div>
      <ListedEducators/>
      
    </div>
  )
}

export default page