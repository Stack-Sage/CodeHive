'use client'
import MyProfile from '@/components/auth/MyProfile'
import React from 'react'
import Toaster from 'react-hot-toast'

const page = () => {
  return (
    <div>
     <Toaster position="bottom-right"  />
      <MyProfile/>
      
    </div>
  )
}

export default page
