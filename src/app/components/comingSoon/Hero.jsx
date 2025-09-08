"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Loader from "./Loader";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center mt-16 px-4 relative ">
      
   <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col md:flex-row items-center gap-6 justify-center mt-12"
    >
     
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Image
          src="/logo.png"
          alt="CodeHype Logo"
          width={100}
          height={100}
          className="rounded-full hue-rotate-90 invert  shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(255,0,150,0.6)] transition-shadow duration-500"
        />
      </motion.div>

      {/* Project Name with neon gradient + glow */}
      <motion.h1
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:drop-shadow-[0_0_40px_rgba(255,0,150,0.7)] transition-shadow duration-500"
      >
        CodeHive
      </motion.h1>
    </motion.div>

      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-6 max-w-2xl text-gray-700 text-lg md:text-xl leading-relaxed shadow-sm"
      >
        A modern platform where anyone can share their skills 🐝 — from coding to chess, art to calligraphy.{" "}
        <span className="font-semibold hover:text-blue-500 transition-colors duration-300">
          CodeHype
        </span>{" "}
        makes learning and sharing effortless, fun, and visually engaging.
      </motion.p> */}

    
      <div className="absolute top-0 left-1/4 w-24 h-24 rounded-full bg-blue-200 opacity-20 blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-pink-200 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-28 h-28 rounded-full bg-purple-200 opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
    </section>
  );
}
