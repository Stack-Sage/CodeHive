'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaChartBar } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const barData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Profile Clicks",
      data: [12, 19, 14, 17, 22, 24, 20],
      backgroundColor: "rgba(59,130,246,0.6)",
      borderRadius: 8,
    },
  ],
};

export default function ProfileClicksBar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        <FaChartBar className="text-blue-500 text-2xl mr-2" />
        <span className="font-semibold text-lg text-blue-900">Profile Clicks (Weekly)</span>
      </div>
      <Bar data={barData} options={{
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
        responsive: true,
        maintainAspectRatio: false,
      }} height={180} />
    </motion.div>
  );
}
