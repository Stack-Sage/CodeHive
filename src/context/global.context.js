'use client'
import { showInfo, showSuccess } from "@/ui/toast";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { sendMessageApi } from "@/services/chat.service";
import { set } from "date-fns";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [allUser, setAllUser] = useState([]);
  const [visitedUser, setVisitedUser] = useState(null);


  const [user, setUser] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const s = localStorage.getItem("user");
        return s ? JSON.parse(s) : null;
      }
    } catch {}
    return null;
  });
  const [isLogin, setIsLogin] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [otp, setOtp] = useState('');
  const [userRole, setUserRole] = useState("");
  
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {

        localStorage.setItem("user", user ? JSON.stringify(user) : "");
        localStorage.setItem("isLogin", !!user?._id);
        setIsLogin(!!user?._id);

        if(!localStorage.getItem("visitedUser")){
          setVisitedUser(JSON.parse(localStorage.getItem("user")));
        }

        if (!user?._id) {
          localStorage.removeItem("user");
          setIsLogin(false);
          showInfo("Please login to continue")
        } 

        if(user?._id){
          setIsLogin(true);
          if(user?.roles?.includes("educator")){
            localStorage.setItem("userRole","teacher");
            setUser(user);
            setUserRole("teacher");
          }
          else{
            localStorage.setItem("userRole","student");
            setUserRole("student");
          }

          showSuccess(`Welcome back, ${user.fullname}!`)
        }
      }
      
    } catch {}
  }, [user,isLogin]);


  const openChatWithUser = (targetUserId, targetRole = "educator", newWindow = false) => {
    setVisitedUser({ _id: targetUserId, role: targetRole });
    const base = "/chat";
    const url = `${base}/${targetUserId}`;
    if (newWindow && typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      router.push(url);
    }
  };

  const startChatWithUser = async (targetUserId, initialMessage = "Hi 👋") => {
    try {
      if (!isLogin || !user?._id) {
        router.push("/auth/login");
        return;
      }
      await sendMessageApi({
        senderId: user._id,
        receiverId: targetUserId,
        message: initialMessage,
      });
      showSuccess("Message sent");
      openChatWithUser(targetUserId, "educator", true);
    } catch (e) {
      console.error("Failed to start chat:", e);
      showInfo("Unable to start chat. Please try again.");
    }
  };

  return (
    <GlobalContext.Provider value={{
      user, setUser,
      isLogin, setIsLogin,
      allUser, setAllUser,
      visitedUser, setVisitedUser,
      searchResults, setSearchResults,
      otp, setOtp,
      openChatWithUser,
      startChatWithUser, 
      userRole, setUserRole 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => useContext(GlobalContext);