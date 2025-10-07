"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative flex flex-row rounded-full mt-8 gap-4 items-center justify-center overflow-hidden px-4 scale-90 bg-gradient-to-br from-blue-50/60 via-purple-50/40 to-pink-50/60 shadow-md border border-blue-200/30 backdrop-blur-xl"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      >
        Coming Soon
      </motion.h1>
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-400 border-pink-400 animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-4 border-t-purple-400 border-blue-400 animate-spin-slow"></div>
        <div className="absolute inset-0 flex justify-around items-center">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ backgroundColor: ["#3B82F6", "#8B5CF6", "#F472B6", "#3B82F6"] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              className="w-2 h-6 rounded-full shadow"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
