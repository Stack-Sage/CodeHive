'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Hero from "./Hero";
import { buttonStyle } from "@/ui/CustomCSS";
import { useGlobalContext } from "@/context/global.context";
import { showInfo, showSuccess } from "@/ui/toast";



const Explore = () => {
  const router = useRouter();
  const {setUser,setIsLogin,user} = useGlobalContext()

    useEffect(() => {
    showInfo("This Website is under development. Some features may not work as expected.");
  }, []);


  const handleTeacher = () => {
    const storedUser = localStorage.getItem("user");
    console.log("stored user is ",storedUser)
    if (storedUser === "undefined" || !storedUser) {
      showInfo("Please register or login as a teacher to continue.");
      router.push("/register");
    }
    else{
      setUser(JSON.parse(storedUser));
      setIsLogin(true);
      showSuccess( `Welcome back, ${JSON.parse(storedUser).fullname}!`);
      console.log("user is ",user)
      router.push("/profile");
    }
  }
  
  const handleStudent = ()=>{
    showSuccess("Welcome to CodeHive! Explore and Learn.")
    router.push("/listing");
  }

  
  return (
    <section className="relative flex   mx-4 flex-col items-center justify-center overflow-hidden ">

      <Hero/>
    
      <div className="absolute top-10 left-20 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 drop-shadow-sm"
      >
        Get Started <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Now!</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-6 text-lg md:text-xl text-gray-700 text-center max-w-xl"
      >
        Whether you're here to <span className="font-semibold text-blue-600">learn</span> or to <span className="font-semibold text-pink-600">teach</span>, we've got a space for you.  
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex gap-6 justify-center mt-8 mb-2"
      >
        <button
          onClick={handleStudent}
          className={` ${buttonStyle} brightness-105 `}
        >
          🎓 Join as Student
        </button>

        <button
          onClick={handleTeacher}
          className=  {` ${buttonStyle} brightness-105`}
        >
          📚 Join as Teacher
        </button>
      </motion.div>
    </section>
  );
};

export default Explore;
