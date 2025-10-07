'use client'
import React from "react";
import { motion } from "framer-motion";
import Hero from "./Hero";

const glassyButton = `
  w-[300px] mx-auto md:mx-0 px-6 py-3 rounded-xl font-semibold shadow-xl
  backdrop-blur-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
  text-white border border-blue-200/40
  transition-all duration-300 ease-in-out
  hover:from-sky-600 hover:via-blue-600 hover:to-indigo-700
  hover:shadow-[0_4px_24px_rgba(139,92,246,0.25)]
  active:scale-95
  focus:ring-2 focus:ring-blue-400
  relative overflow-hidden
  cursor-pointer
`;

const buttonShine = `
  before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-white/10
  before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
`;

const fadeInVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const Explore = ({ user, userRole, heroButtons = [], handleAction }) => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
      className="relative flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl min-h-[40vh] py-8 md:py-14 px-2 md:px-8 lg:px-16 ml-2 md:mx-auto rounded-3xl shadow-2xl
        bg-gradient-to-br from-sky-200/60 via-purple-200/40 to-indigo-200/60
        backdrop-blur-2xl border border-blue-200/40
        transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
        background: "linear-gradient(120deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)"
      }}
    >
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 flex flex-col justify-center items-start gap-4 md:gap-6 w-full"
      >
        <Hero />
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-left bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-indigo-500 to-sky-500"
        >
          Welcome to CodeHive
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-2 md:mt-4 text-base md:text-lg lg:text-xl text-gray-700 text-left max-w-xl"
        >
          Discover mentors, learn new skills, and connect with educators. Choose how you want to start your journey!
        </motion.p>
      </motion.div>
      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-6 justify-center items-stretch md:items-center mt-8 md:mt-0 w-full lg:w-[420px]"
      >
        {!user ? (
          <>
            {heroButtons.map((btn, idx) => (
              <motion.button
                key={btn.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(139,32,236,0.40)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAction(btn.action)}
                className={glassyButton + buttonShine}
              >
                {btn.label}
              </motion.button>
            ))}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 items-center"
          >
            <div className="w-full text-center text-green-600 font-semibold mb-2">
              {userRole === "educator"
                ? "You are logged in as Educator. You can go directly to your Dashboard."
                : "You are logged in as Student. You can go directly to the Listing page."}
            </div>
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() =>
                handleAction(userRole === "educator" ? "/dashboard" : "/listing")
              }
              className={glassyButton + buttonShine}
            >
              {userRole === "educator" ? "Go to Dashboard" : "Go to Listing"}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
      {/* Decorative blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute top-10 left-5 md:left-20 w-40 md:w-56 h-40 md:h-56 bg-gradient-to-br from-pink-300/30 via-white/10 to-blue-300/30 rounded-full blur-3xl pointer-events-none"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-10 right-5 md:right-20 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-blue-300/30 via-white/10 to-pink-300/30 rounded-full blur-3xl pointer-events-none"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 60% 10%, rgba(255,255,255,0.25) 0%, transparent 70%)"
        }}
      ></motion.div>
    </motion.section>
  );
};

export default Explore;