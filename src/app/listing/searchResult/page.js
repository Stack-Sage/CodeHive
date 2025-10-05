'use client'

import ListedSearchUser from '@/components/student/ListedSearchUser'
import SearchEducator from '@/components/student/SearchEducator'

export default function page() {
   return (
      <div className='min-h-screen  flex flex-col '>
         <SearchEducator />


         <div>
            <ListedSearchUser/>
         </div>
      </div>
   )
}