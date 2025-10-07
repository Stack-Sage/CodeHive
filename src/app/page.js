'use client';

import { useEffect, useState } from 'react';
import LandingPage from '../components/comingSoon/LandingPage';

export default function Page() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setUserRole(localStorage.getItem("userRole") || "");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center -mt-16 relative">
      <LandingPage user={user} userRole={userRole} />
    </main>
  );
}
 