'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaSmileBeam } from "react-icons/fa";

export default function StudentFeedbackSummary({ feedback }) {
  if (!feedback) return <div className="p-6 text-blue-600">Loading feedback...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-pink-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-6"
    >
      <div className="font-semibold text-lg text-pink-700 mb-2 flex items-center gap-2">
        <FaSmileBeam /> Student Feedback Summary
      </div>
      <div className="text-gray-700 text-sm">
        <span className="font-bold text-blue-700">{feedback?.excellentPercent ?? 0}%</span> of students rated sessions as "Excellent".
      </div>
      <div className="text-gray-700 text-sm mt-1">
        <span className="font-bold text-green-600">{feedback?.recommendPercent ?? 0}%</span> of students would recommend you to others.
      </div>
    </motion.div>
  );
}
