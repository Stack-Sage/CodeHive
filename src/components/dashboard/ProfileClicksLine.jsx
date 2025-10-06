'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Profile Clicks",
      data: [22, 34, 28, 41, 39, 55, 48],
      fill: true,
      backgroundColor: "rgba(59,130,246,0.12)",
      borderColor: "rgba(59,130,246,0.9)",
      pointBackgroundColor: "rgba(236,72,153,0.8)",
      pointBorderColor: "#fff",
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8,
    },
  ],
};

const lineOptions = {
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#1e293b" } },
    y: { grid: { color: "#e0e7ff" }, ticks: { color: "#1e293b" } },
  },
  responsive: true,
  maintainAspectRatio: false,
};

export default function ProfileClicksLine() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-blue-100/60 via-pink-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        <FaChartLine className="text-blue-500 text-2xl mr-2" />
        <span className="font-semibold text-lg text-blue-900">Profile Clicks (Weekly)</span>
      </div>
      <div className="h-48 w-full">
        <Line data={lineData} options={lineOptions} />
      </div>
    </motion.div>
  );
}
