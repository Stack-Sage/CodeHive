'use client'
import { showInfo, showSuccess } from "@/ui/toast";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { sendMessageApi } from "@/services/chat.service";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [allUser, setAllUser] = useState([]);
  const [visitedUser, setVisitedUser] = useState(null);

  // Only initialize from localStorage once
  const [user, setUser] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const s = localStorage.getItem("user");
        return s ? JSON.parse(s) : null;
      }
    } catch {}
    return null;
  });
  const [isLogin, setIsLogin] = useState(() => !!user?._id);
  const [searchResults, setSearchResults] = useState([]);
  const [otp, setOtp] = useState('');
  const [userRole, setUserRole] = useState(() => {
    if (user?.roles?.includes("educator")) return "teacher";
    if (user?.roles?.includes("student")) return "student";
    return "";
  });

  // Sync localStorage and login state only when user changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user && user._id) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLogin", "true");
      setIsLogin(true);
      if (user?.roles?.includes("educator")) {
        localStorage.setItem("userRole", "teacher");
        setUserRole("teacher");
      } else {
        localStorage.setItem("userRole", "student");
        setUserRole("student");
      }
      showSuccess(`Welcome back, ${user.fullname}!`);
    } else {
      localStorage.removeItem("user");
      localStorage.setItem("isLogin", "false");
      setIsLogin(false);
      setUserRole("");
      showInfo("Please login to continue");
    }
    // Only set visitedUser if not already set
    if (!localStorage.getItem("visitedUser") && user) {
      setVisitedUser(user);
    }
  }, [user]);

  // Listen for unauthorized events (custom event from service files)
  useEffect(() => {
    function handleUnauthorizedEvent() {
      // Clear login state and localStorage, redirect to login
      localStorage.setItem("isLogin", "false");
      localStorage.removeItem("user");
      setUser(null);
      setIsLogin(false);
      setUserRole("");
      window.location.href = "/auth/login";
    }
    window.addEventListener("unauthorized", handleUnauthorizedEvent);
    return () => window.removeEventListener("unauthorized", handleUnauthorizedEvent);
  }, []);

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