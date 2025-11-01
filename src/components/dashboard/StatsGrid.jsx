'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

export default function StatsGrid({ stats }) {
  if (!stats) return <div className="p-6 text-blue-600">Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #60a5fa33" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center"
      >
        <FaUserGraduate className="text-blue-500 text-3xl mb-2" />
        <span className="text-3xl font-extrabold text-black">{stats.studentCount ?? 0}</span>
        <span className="text-gray-700 mt-1 font-medium">Students</span>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #6366f133" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-indigo-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center"
      >
        <FaEnvelope className="text-indigo-500 text-3xl mb-2" />
        <span className="text-3xl font-extrabold text-black">{stats.messagesReceived ?? 0}</span>
        <span className="text-gray-700 mt-1 font-medium">Messages Received</span>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #a78bfa33" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-purple-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center"
      >
        <FaCalendarAlt className="text-purple-500 text-3xl mb-2" />
        <span className="text-3xl font-extrabold text-black">{stats.sessionsGiven ?? 0}</span>
        <span className="text-gray-700 mt-1 font-medium">Sessions Given</span>
      </motion.div>
    </div>
  );
}
