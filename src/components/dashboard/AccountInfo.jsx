'use client';
import React from "react";
import { useGlobalContext } from "@/context/global.context";
import { FaCalendarAlt, FaGlobeAsia, FaEnvelope, FaUser, FaMoneyBillWave, FaSyncAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

function getAccountAge(createdAt) {
  if (!createdAt) return "N/A";
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  return `${diffDays} days`;
}

function getUserAge(dob) {
  if (!dob) return "N/A";
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return `${age} years`;
}

export default function AccountInfo() {
  const { user } = useGlobalContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-2"
    >
      <div className="flex items-center item-center font-bold gap-4 mb-4 text-center  tracking-tight">
        <FaUser className="text-blue-800" />
        Account Information
      </div>
      
          <div className="text-gray-700 text-sm flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> {user?.email || "N/A"}
          </div>
      <div className="text-gray-700 text-sm mb-1 flex items-center gap-2">
        <FaGlobeAsia className="text-blue-500" />
        <span className="font-semibold">Country:</span> {user?.country || "N/A"}
      </div>
      <div className="text-gray-700 text-sm mb-1 flex items-center gap-2">
        <FaCalendarAlt className="text-blue-500" />
        <span className="font-semibold">Account Created:</span> {formatDate(user?.createdAt)}
      </div>
      <div className="text-gray-700 text-sm mb-1 flex items-center gap-2">
        <FaSyncAlt className="text-blue-500" />
        <span className="font-semibold">Last Updated:</span> {formatDate(user?.updatedAt)}
      </div>
      <div className="text-gray-700 text-sm mb-1">
        <span className="font-semibold">Account Age:</span> {getAccountAge(user?.createdAt)}
      </div>
      <div className="text-gray-700 text-sm mb-1">
        <span className="font-semibold">User Age:</span> {getUserAge(user?.dob)}
      </div>
      <div className="text-gray-700 text-sm mb-1 flex items-center gap-2">
        <FaMoneyBillWave className="text-green-500" />
        <span className="font-semibold">Session Price:</span> ₹{user?.price || "N/A"}
      </div>
      <div className="text-gray-700 text-sm mb-1">
        <span className="font-semibold">Skills:</span> {Array.isArray(user?.skills) ? user.skills.join(", ") : "N/A"}
      </div>
    </motion.div>
  );
}
