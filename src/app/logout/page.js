'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserHook from '@/hooks/useUserHook';
import { showSuccess } from '@/ui/toast';

export default function Page() {
   const router = useRouter();
   const { logoutUser } = useUserHook();
   useEffect(() => {

      const logout = async () => {
         await logoutUser()


            console.log('Logged out from server');
            showSuccess('Logged out successfully');
            localStorage.removeItem('user');
            localStorage.removeItem('isLogin');
            localStorage.removeItem('userRole');
            localStorage.removeItem('visitedUser');
            localStorage.clear();
            setTimeout(() => {
               router.push('/');
            }, 1000);
         };

      logout();
      
   }, []);

   return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
         <h1 className='text-2xl font-bold'>Logout</h1>

         <p className='mt-4'>You have been logged out successfully.</p>
      </div>
   );
}
   