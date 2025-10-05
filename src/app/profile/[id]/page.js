
import React from 'react'
import { useGlobalContext } from '@/context/global.context';
import GetAnyUser from '@/components/student/GetAnyUser';

const page = ({ params }) => {
   const { id } = params;
   
  return (
    < div className='min-h-screen py-16 items-center '>
    
    <GetAnyUser id = {id}/>
    </div>
  )
}

export default page