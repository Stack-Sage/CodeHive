'use client'
import { showInfo, showSuccess } from "@/ui/toast";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, use } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
   const router = useRouter();
  const [allUser, setAllUser] = useState([]);
  const [visitedUser, setVisitedUser] = useState(null);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [otp,setOtp] = useState('');

  useEffect(() => {
    showInfo("This Website is still in beta Mode. Some features might not work as expected.");
  }, []);



  return (
    <GlobalContext.Provider value={{ user, setUser, isLogin, setIsLogin, allUser, setAllUser, visitedUser, setVisitedUser, searchResults, setSearchResults , otp, setOtp }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => useContext(GlobalContext);
