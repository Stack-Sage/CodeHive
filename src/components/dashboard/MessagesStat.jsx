'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText, FaEnvelope } from "react-icons/fa";

export default function MessagesStat({ sent = 24, received = 120 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-indigo-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center mb-6"
    >
      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center">
          <FaEnvelopeOpenText className="text-blue-500 text-2xl mb-1" />
          <span className="text-lg font-bold text-black">{sent}</span>
          <span className="text-gray-700 text-xs">Messages Sent</span>
        </div>
        <div className="flex flex-col items-center">
          <FaEnvelope className="text-pink-500 text-2xl mb-1" />
          <span className="text-lg font-bold text-black">{received}</span>
          <span className="text-gray-700 text-xs">Messages Received</span>
        </div>
      </div>
    </motion.div>
  );
}
