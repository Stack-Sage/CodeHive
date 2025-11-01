'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaCalendarPlus } from "react-icons/fa";
import { useGlobalContext } from "@/context/global.context";

export default function QuickActions() {
  const { userRole } = useGlobalContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-2"
    >
      <div className="font-bold text-lg text-blue-900 mb-2">Quick Actions</div>
      <div className="flex flex-col gap-3">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
          onClick={() => window.location.href = "/profile/edit"}
        >
          <FaEdit /> Edit Profile
        </button>
        {userRole === "teacher" && (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition"
            onClick={() => window.location.href = "/sessions/schedule"}
          >
            <FaCalendarPlus /> Schedule Session
          </button>
        )}
      </div>
    </motion.div>
  );
}
