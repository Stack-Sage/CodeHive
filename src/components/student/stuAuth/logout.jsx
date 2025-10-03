"use client";
import { useGlobalContext } from "@/context/global.context";
import { logoutStudentApi } from "@/services/student.service";
import { showInfo, showSuccess } from "@/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutStudent = () => {
  const { setIsStuLogin, setStudentUser } = useGlobalContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {

    try {
      setLoading(true)
      
      const response = await logoutStudentApi();
      console.log(response)
      console.log("Logout successful");
      
     
      localStorage.removeItem('studentUser');
      localStorage.removeItem('isStuLogin');
      // Update global context
      setStudentUser(null);
      setIsStuLogin(false);
      
      showSuccess("Logged out successfully!");
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error("Error during logout:", error);
      showInfo("Logged out, but there was an issue with the server.");
      
      // Still clear state and redirect even if API fails
      localStorage.removeItem('student');
      setStudentUser(null);
      setIsStuLogin(false);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center text-red-500 hover:text-red-700 transition-colors"
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Logging out...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </>
      )}
    </button>
  );
};

export default LogoutStudent;