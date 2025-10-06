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

  useEffect(() => {
    showInfo("This Website is under development. Some features may not work as expected.");
  }, []);


  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  return (
    <section className="relative flex mx-4 flex-col items-center justify-center overflow-hidden">

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
        To explore CodeHive, please <span className="font-semibold text-blue-600">login</span> or <span className="font-semibold text-pink-600">sign up</span> to continue.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex gap-6 justify-center mt-8 mb-2"
      >
        <button
          onClick={handleLogin}
          className={` ${buttonStyle} brightness-105 `}
        >
          🔑 Login
        </button>

        <button
          onClick={handleSignUp}
          className={` ${buttonStyle} brightness-105 `}
        >
          📝 Sign Up
        </button>
      </motion.div>
    </section>
  );
};

export default Explore;