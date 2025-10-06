'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

const events = [
  { date: "2024-06-10", title: "Session: Python Basics" },
  { date: "2024-06-12", title: "Session: React Advanced" },
  { date: "2024-06-15", title: "Session: Data Science Q&A" },
];

export default function UpcomingEventsCalendar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-purple-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-6"
    >
      <div className="font-semibold text-lg text-purple-900 mb-2 flex items-center gap-2">
        <FaCalendarAlt /> Upcoming Sessions/Events
      </div>
      <ul>
        {events.map((e, i) => (
          <li key={i} className="mb-2 flex items-center gap-2">
            <span className="font-bold text-blue-700">{e.date}</span>
            <span className="text-gray-700">{e.title}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
