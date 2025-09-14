'use client'
import { useState } from 'react'
import ListedSearchUser from '@/components/student/ListedSearchUser'
import SearchEducator from '@/components/student/SearchEducator'


import React from 'react'

const page = () => {
 

  return (
    <div>

      <div className='fixed top-0 left-0 w-full '>
         <SearchEducator goBack = {true} />

      </div>

      <div className='pt-24   pb-10 '> 
      
      <ListedSearchUser />
       
      </div>

    </div>
  )
}



export default page