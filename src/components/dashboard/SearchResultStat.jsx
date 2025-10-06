'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function SearchResultStat({ count = 7 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center mb-6"
    >
      <FaSearch className="text-blue-500 text-3xl mb-2" />
      <span className="text-2xl font-bold text-black">{count}</span>
      <span className="text-gray-700 mt-1">Times appeared in search results</span>
    </motion.div>
  );
}
