'use client'

import ListedEducators from '@/components/student/ListedEducators'
import SearchEducator from '@/components/student/SearchEducator'

export default function page() {
   return (
      <div className='min-h-screen flex flex-col'>
         <SearchEducator />


         <div>
            <ListedEducators/>
         </div>
      </div>
   )
}