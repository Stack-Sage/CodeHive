"use client";
import React from "react";
import { useGlobalContext } from "@/context/global.context";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

export default function SessionsDoughnut({ stats }) {
  const { userRole } = useGlobalContext();
  if (userRole !== "teacher") return null;

  const doughnutData = {
    labels: ["Completed", "Upcoming", "Cancelled"],
    datasets: [
      {
        data: [
          stats.sessionsGiven,
          stats.upcomingSessions,
          stats.cancelledSessions,
        ],
        backgroundColor: [
          "rgba(34,197,94,0.8)",
          "rgba(59,130,246,0.8)",
          "rgba(236,72,153,0.7)",
        ],
        borderWidth: 3,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-purple-100/60 via-blue-100/40 to-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        <FaCalendarAlt className="text-purple-500 text-2xl mr-2" />
        <span className="font-semibold text-lg text-purple-900">
          Sessions Overview
        </span>
      </div>
      <div className="h-48 w-full flex items-center justify-center">
        <Doughnut
          data={doughnutData}
          options={{
            plugins: { legend: { position: "bottom" } },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </motion.div>
  );
}
