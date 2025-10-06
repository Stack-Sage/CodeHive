'use client';
import React from "react";
import { motion } from "framer-motion";

export default function ProfileCard({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-6"
    >
      <img
        src={user?.avatar || "/default-avatar.png"}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow"
      />
      <div>
        <div className="text-2xl font-bold text-blue-900">{user?.fullname || "Educator Name"}</div>
        <div className="text-gray-700 text-sm mt-1">Country: {user?.country || "N/A"}</div>
        <div className="text-gray-700 text-sm">DOB: {new Date(user?.dob).toLocaleDateString() || "N/A"}</div>
        <div className="text-gray-700 text-sm">Time on site: {user?.timeOnSite || "2h 30m"}</div>
        <button
          className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full shadow hover:scale-105 transition"
          onClick={() => window.location.href = "/profile"}
        >
          Go to My Profile
        </button>
      </div>
    </motion.div>
  );
}

