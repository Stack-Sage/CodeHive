'use client'
import { showInfo, showSuccess } from "@/ui/toast";
import { setupTokenRefresh } from "@/utils/setupTokenRefresh";
import { setupTokenRefreshStu } from "@/utils/setupTokenRefreshStu";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react"; // remove "use"
import { sendMessageApi } from "@/services/chat.service"; // add

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [allUser, setAllUser] = useState([]);
  const [visitedUser, setVisitedUser] = useState(null);

  // Hydrate from localStorage synchronously (prevents redirect flicker on new tab)
  const [studentUser, setStudentUser] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const s = localStorage.getItem("studentUser");
        return s ? JSON.parse(s) : null;
      }
    } catch {}
    return null;
  });
  const [user, setUser] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const s = localStorage.getItem("user");
        return s ? JSON.parse(s) : null;
      }
    } catch {}
    return null;
  });
  const [isStuLogin, setIsStuLogin] = useState(() => {
    if (typeof window !== "undefined") {
      const v = localStorage.getItem("isStuLogin");
      return v === "true" || v === true;
    }
    return false;
  });

  const [isLogin, setIsLogin] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [otp,setOtp] = useState('');

  useEffect(() => {
    setupTokenRefresh();
    setupTokenRefreshStu();
  }, []);

  useEffect(() => {
    // Keep auth flags in sync
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("isStuLogin", String(isStuLogin === true || isStuLogin === "true"));
        localStorage.setItem("studentUser", studentUser ? JSON.stringify(studentUser) : "");
        localStorage.setItem("user", user ? JSON.stringify(user) : "");
      }
    } catch {}
  }, [isStuLogin, studentUser, user]);

  // Open a chat thread by user id (student->teacher by default)
  const openChatWithUser = (targetUserId, targetRole = "teacher", newWindow = false) => {
    setVisitedUser({ _id: targetUserId, role: targetRole });
    const base = targetRole === "teacher" ? "/studentChat/chat" : "/teacherChat/chat";
    const url = `${base}/${targetUserId}`;
    if (newWindow && typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      router.push(url);
    }
  };

  // Start a chat by sending an initial message, then open the chat
  const startChatWithUser = async (targetUserId, initialMessage = "Hi 👋") => {
    try {
      // ensure student is logged-in
      if (!(isStuLogin === true || isStuLogin === "true") || !studentUser?._id) {
        router.push("/studentChat/auth/login");
        return;
      }
      await sendMessageApi({
        senderId: studentUser._id,
        receiverId: targetUserId,
        senderRole: "Student",
        message: initialMessage,
      });
      showSuccess("Message sent to teacher");
      openChatWithUser(targetUserId, "teacher", true);
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
      isStuLogin, setIsStuLogin,
      studentUser, setStudentUser,
      openChatWithUser,
      startChatWithUser, // add
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
