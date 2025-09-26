import React from 'react'
import { useRouter } from 'next/navigation'
import { logoutUserApi } from '@/services/user.service';
import { useGlobalContext } from '@/context/global.context';

const Logout = () => {


  const {isLogin, setIsLogin,setUser} = useGlobalContext();

  const router = useRouter();
  const useLogout = async () => {
    try { 
      
       const response = await logoutUserApi();
        if(response.success){
          setIsLogin(false);
          localStorage.removeItem('user');
          
          showSuccess("Logged out successfully");
          setUser(null);
          router.push('/login');
        }
    } catch (error) {
      console.error("Logout failed:", error);
    }

  }

  return {
    useLogout
  }
}

export default Logout
  