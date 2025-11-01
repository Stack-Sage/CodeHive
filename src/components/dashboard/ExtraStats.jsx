'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaEye, FaUsers, FaSmileBeam } from "react-icons/fa";

export default function ExtraStats({ stats }) {
  if (!stats) return <div className="p-6 text-blue-600">Loading extra stats...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #fde68a33" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-yellow-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center"
        >
          <FaStar className="text-yellow-400 text-3xl mb-2" />
          <span className="text-2xl font-bold text-black">{stats.rating}</span>
          <span className="text-gray-700 mt-1">Average Rating</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #60a5fa33" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center"
        >
          <FaEye className="text-blue-400 text-3xl mb-2" />
          <span className="text-2xl font-bold text-black">{stats.profileClicks}</span>
          <span className="text-gray-700 mt-1">Profile Clicks</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #34d39933" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center"
        >
          <FaUsers className="text-green-500 text-3xl mb-2" />
          <span className="text-2xl font-bold text-black">{stats.followers}</span>
          <span className="text-gray-700 mt-1">Followers</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #f472b633" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-pink-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center"
        >
          <FaSmileBeam className="text-pink-400 text-3xl mb-2" />
          <span className="text-2xl font-bold text-black">{stats.happyStudents}</span>
          <span className="text-gray-700 mt-1">Happy Students</span>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-center"
      >
        <span className="text-lg text-gray-700">
          <span className="font-semibold text-blue-600">Average Clicks/Day:</span> {stats.avgClicksPerDay}
        </span>
        <span className="mx-4 text-lg text-gray-700">
          <span className="font-semibold text-purple-600">Upcoming Sessions:</span> {stats.upcomingSessions}
        </span>
      </motion.div>
    </>
  );
}
