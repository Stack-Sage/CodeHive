'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";
import { useGlobalContext } from "@/context/global.context";

export default function SessionHoursStat({ hours = 32 }) {
  const { userRole } = useGlobalContext();
  if (userRole !== "teacher") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-purple-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center mb-6"
    >
      <FaClock className="text-purple-500 text-3xl mb-2" />
      <span className="text-2xl font-bold text-black">{hours}</span>
      <span className="text-gray-700 mt-1">Total Session Hours</span>
    </motion.div>
  );
}
