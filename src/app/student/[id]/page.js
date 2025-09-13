''
import React from 'react'
import { useGlobalContext } from '@/context/global.context';
import GetAnyUser from '@/components/student/GetAnyUser';

const page = ({ params }) => {
   const { id } = params;
   
  return (
    <>
    
    <GetAnyUser id = {id}/>
    </>
  )
}

export default page