'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, use } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
   const router = useRouter();
  const [allUser, setAllUser] = useState([]);
  const [visitedUser, setVisitedUser] = useState(null);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setIsLogin(true);
//       // router.push("/student");
//     }
//   }, []);



  return (
    <GlobalContext.Provider value={{ user, setUser, isLogin, setIsLogin, allUser, setAllUser, visitedUser, setVisitedUser }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => useContext(GlobalContext);
