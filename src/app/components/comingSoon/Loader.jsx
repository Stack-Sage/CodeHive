"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="relative flex flex-row rounded-full lg:mt-10 md:mt-4 -mt-10 gap-4 items-center justify-center overflow-hidden px-4 lg:scale-100 md:scale-90 scale-75">
      
      {/* Coming Soon Neon Text */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="lg:text-6xl md:text-5xl text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
      >
        Coming Soon
      </motion.h1>

      <div className="relative w-28 h-28 not-lg:scale-75 ">
      
        <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-blue-500 animate-spin shadow-[0_0_30px_rgba(255,0,150,0.5)]"></div>
        <div className="absolute inset-3 rounded-full border-4 border-t-blue-400 border-purple-500 animate-spin-slow shadow-[0_0_20px_rgba(130,0,255,0.4)]"></div>

        
        <div className="absolute inset-0 flex justify-around items-center">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ backgroundColor: ["#F472B6", "#3B82F6", "#8B5CF6", "#F472B6"] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              className="w-2 h-6 rounded-full shadow-lg"
            />
          ))}
        </div>

     
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 opacity-30 blur-3xl animate-pulse"></div>
      </div>

   
      <div className="absolute top-0 left-1/4 w-28 h-28 rounded-full bg-pink-400 opacity-20 blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-36 h-36 rounded-full bg-blue-400 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-purple-400 opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
    </div>
  );
}
