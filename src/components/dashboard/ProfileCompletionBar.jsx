'use client';
import React from "react";
import { motion } from "framer-motion";

export default function ProfileCompletionBar({ percent = 80 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-2"
    >
      <div className="font-bold text-lg text-blue-900 mb-2">Profile Completion</div>
      <div className="w-full bg-blue-100 rounded-full h-4 mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1 }}
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-right text-sm font-semibold text-blue-700">{percent}%</div>
    </motion.div>
  );
}
