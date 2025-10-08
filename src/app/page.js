'use client';

import { useEffect, useState } from 'react';
import LandingPage from '../components/comingSoon/LandingPage';
import { a } from 'framer-motion/dist/types.d-DsEeKk6G';
import { everythingOkayApi } from '@/services/user.service';
import { showInfo } from '@/ui/toast';


export default function Page() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setUserRole(localStorage.getItem("userRole") || "");
    }

    const isEverythingOkay = async () => {
      try {
        const response = await everythingOkayApi();
        if (response.status !== 200) {
          showInfo("Ctrl+L to toggle smooth scrolling");
        }
      } catch (error) {
        console.error("Error checking API health:", error); 
      }
    };

    isEverythingOkay();
  }, []);

  return (
    <main className="flex min-h-screen flex-col   overflow-hidden  overflow-x-hidden items-center justify-center -mt-16 relative w-screen">
 
      <LandingPage user={user} userRole={userRole} />
    </main>
  );
}
