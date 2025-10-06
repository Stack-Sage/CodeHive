'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  { name: "Student A", rating: 5, comment: "Amazing educator! Learned a lot." },
  { name: "Student B", rating: 4, comment: "Very helpful and patient." },
  { name: "Student C", rating: 5, comment: "Great sessions, highly recommend." },
];

export default function ReviewsList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-6"
    >
      <div className="font-semibold text-lg text-blue-900 mb-2">Recent Reviews</div>
      <ul>
        {reviews.map((r, i) => (
          <li key={i} className="mb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-black">{r.name}</span>
              {[...Array(r.rating)].map((_, idx) => (
                <FaStar key={idx} className="text-yellow-400 text-sm" />
              ))}
            </div>
            <div className="text-gray-700 text-sm ml-2">{r.comment}</div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
